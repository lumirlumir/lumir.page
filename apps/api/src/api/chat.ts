/**
 * @fileoverview Chat endpoint for API routes.
 * @see https://vercel.com/docs/functions Vercel
 * @see https://aistudio.google.com Gemini
 * @see https://ai.google.dev/gemini-api/docs Gemini
 * @see https://ai.google.dev/gemini-api/docs/openai Gemini
 * @see https://developers.openai.com/api/docs/models/gpt-5-nano OpenAI
 * @see https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create OpenAI
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Methods MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Method MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Headers MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Allow MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Origin MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Dest MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Mode MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Site MDN
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import OpenAI from 'openai';
import { ALLOW_ORIGINS } from '../core/constants.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ALLOW_METHODS = 'POST, OPTIONS';
const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/openai/';
const MAX_REQUEST_BODY_BYTES = 8_192;
const MAX_COMPLETION_TOKENS = 2_048;

/**
 * Creates CORS headers for API routes.
 * @param origin The allowed origin for the API route.
 * @returns A Headers object containing the appropriate CORS headers.
 */
function createCORSHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin, // CORS
    'Access-Control-Allow-Methods': ALLOW_METHODS, // CORS
    'Access-Control-Allow-Headers': 'Content-Type', // CORS
    Allow: ALLOW_METHODS,
    Vary: 'Origin',
  } as const;
}

/**
 * Type guard to validate the request body for chat completion creation.
 * @param json The parsed JSON object from the request body.
 * @returns `true` if the JSON object is a valid `ChatCompletionCreateParams`, `false` otherwise.
 */
function isChatCompletionCreateParams(
  json: unknown,
): json is Pick<
  OpenAI.ChatCompletionCreateParams,
  'messages' | 'max_completion_tokens' | 'reasoning_effort' | 'temperature' | 'verbosity'
> {
  if (typeof json !== 'object' || json === null) {
    return false;
  }

  // `messages`: required, array
  if (!('messages' in json) || !Array.isArray(json.messages)) {
    return false;
  }

  // `max_completion_tokens`: optional, number
  if (
    'max_completion_tokens' in json &&
    (typeof json.max_completion_tokens !== 'number' || json.max_completion_tokens < 0)
  ) {
    return false;
  }

  // `reasoning_effort`: optional, 'minimal' | 'low' | 'medium' | 'high'
  if (
    'reasoning_effort' in json &&
    json.reasoning_effort !== 'minimal' &&
    json.reasoning_effort !== 'low' &&
    json.reasoning_effort !== 'medium' &&
    json.reasoning_effort !== 'high'
  ) {
    return false;
  }

  // `temperature`: optional, number
  if (
    'temperature' in json &&
    (typeof json.temperature !== 'number' || json.temperature < 0 || json.temperature > 2)
  ) {
    return false;
  }

  // `verbosity`: optional, 'low' | 'medium' | 'high'
  if (
    'verbosity' in json &&
    json.verbosity !== 'low' &&
    json.verbosity !== 'medium' &&
    json.verbosity !== 'high'
  ) {
    return false;
  }

  return true;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Singleton instance of `OpenAI` client. Initialized lazily to avoid unnecessary overhead.
 */
let openai: OpenAI | null = null;

/**
 * `/api/chat` API route handler.
 */
export default {
  async fetch(request: Request) {
    const { headers, method } = request;

    const origin = headers.get('Origin');
    const userAgent = headers.get('User-Agent');
    const secFetchDest = headers.get('Sec-Fetch-Dest');
    const secFetchMode = headers.get('Sec-Fetch-Mode');
    const secFetchSite = headers.get('Sec-Fetch-Site');

    if (
      origin === null ||
      !(ALLOW_ORIGINS as readonly string[]).includes(origin) ||
      userAgent === null ||
      secFetchDest !== 'empty' ||
      secFetchMode !== 'cors' ||
      secFetchSite !== 'same-site'
    ) {
      return new Response(null, {
        status: 403,
        statusText: 'Forbidden',
        // Do not include CORS headers for unauthorized origins to avoid leaking information.
      });
    }

    const corsHeaders = createCORSHeaders(origin);

    if (process.env.DISABLE_CHAT === 'true' || process.env.GEMINI_API_KEY === undefined) {
      return new Response(null, {
        status: 503,
        statusText: 'Service Unavailable',
        headers: corsHeaders,
      });
    }

    switch (method) {
      case 'POST': {
        const contentType = headers.get('Content-Type');

        if (contentType === null || !/^ *application\/json *(?:;|$)/i.test(contentType)) {
          return new Response(null, {
            status: 415,
            statusText: 'Unsupported Media Type',
            headers: corsHeaders,
          });
        }

        let bytes: Uint8Array<ArrayBuffer>;

        try {
          bytes = await request.bytes();

          if (bytes.byteLength > MAX_REQUEST_BODY_BYTES) {
            return new Response(null, {
              status: 413,
              statusText: 'Payload Too Large',
              headers: corsHeaders,
            });
          }
        } catch (error) {
          if (error instanceof RangeError) {
            return new Response(null, {
              status: 413,
              statusText: 'Payload Too Large',
              headers: corsHeaders,
            });
          }

          return new Response('Invalid request body', {
            status: 400,
            statusText: 'Bad Request',
            headers: corsHeaders,
          });
        }

        let json: unknown;

        try {
          json = JSON.parse(new TextDecoder().decode(bytes));
        } catch (error) {
          if (error instanceof SyntaxError) {
            return new Response('Invalid JSON', {
              status: 400,
              statusText: 'Bad Request',
              headers: corsHeaders,
            });
          }

          return new Response('Invalid request body', {
            status: 400,
            statusText: 'Bad Request',
            headers: corsHeaders,
          });
        }

        if (!isChatCompletionCreateParams(json)) {
          return new Response('Invalid parameters', {
            status: 400,
            statusText: 'Bad Request',
            headers: corsHeaders,
          });
        }

        try {
          // Initialize OpenAI client lazily.
          openai ??= new OpenAI({
            apiKey: process.env.GEMINI_API_KEY,
            baseURL: GEMINI_API_ENDPOINT,
          });

          const completion = await openai.chat.completions.create({
            // Fixed parameters
            model: GEMINI_MODEL,
            presence_penalty: 0,
            prompt_cache_retention: '24h',
            stream: false,
            top_p: 1,

            // Dynamic parameters
            messages: json.messages, // required
            max_completion_tokens: Math.min(
              json.max_completion_tokens ?? MAX_COMPLETION_TOKENS,
              MAX_COMPLETION_TOKENS,
            ), // optional
            reasoning_effort: json.reasoning_effort ?? 'medium', // optional
            temperature: json.temperature ?? 0.7, // optional
            verbosity: json.verbosity ?? 'medium', // optional
          });

          return new Response(JSON.stringify(completion), {
            status: 200,
            statusText: 'OK',
            headers: corsHeaders,
          });
        } catch (error) {
          if (error instanceof OpenAI.APIError) {
            return new Response(null, {
              status: error.status ?? 502,
              // Do not include `statusText` because it may vary with the `error.status`.
              headers: corsHeaders,
            });
          }

          return new Response(null, {
            status: 500,
            statusText: 'Internal Server Error',
            headers: corsHeaders,
          });
        }
      }

      case 'OPTIONS': {
        const accessControlRequestMethod = headers.get('Access-Control-Request-Method');

        if (accessControlRequestMethod !== 'POST') {
          return new Response(null, {
            status: 405,
            statusText: 'Method Not Allowed',
            headers: corsHeaders,
          });
        }

        const accessControlRequestHeaders = headers.get('Access-Control-Request-Headers');

        if (
          accessControlRequestHeaders === null ||
          !/^ *content-type *$/i.test(accessControlRequestHeaders)
        ) {
          return new Response(null, {
            status: 400,
            statusText: 'Bad Request',
            headers: corsHeaders,
          });
        }

        return new Response(null, {
          status: 204,
          statusText: 'No Content',
          headers: corsHeaders,
        });
      }

      default: {
        return new Response(`method ${method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: corsHeaders,
        });
      }
    }
  },
} as const;
