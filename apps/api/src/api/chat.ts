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
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Allow MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary MDN
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
const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/openai/`;

/**
 * Creates CORS headers for API routes.
 * @param origin The allowed origin for the API route.
 * @returns A Headers object containing the appropriate CORS headers.
 */
export function createCORSHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin, // CORS
    'Access-Control-Allow-Methods': ALLOW_METHODS, // CORS
    Allow: ALLOW_METHODS,
    Vary: 'Origin',
  } as const;
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
    if (
      process.env.DISABLE_CHAT === 'true' ||
      process.env.GEMINI_API_KEY === undefined ||
      process.env.OPENAI_API_KEY === undefined
    ) {
      return new Response(null, {
        status: 503,
        statusText: 'Service Unavailable',
        headers: createCORSHeaders('*'),
      });
    }

    const origin = request.headers.get('Origin');
    const userAgent = request.headers.get('User-Agent');

    if (origin === null || userAgent === null || !ALLOW_ORIGINS.has(origin)) {
      return new Response(null, {
        status: 403,
        statusText: 'Forbidden',
        headers: createCORSHeaders('*'),
      });
    }

    const corsHeaders = createCORSHeaders(origin);

    switch (request.method) {
      case 'POST': {
        // Initialize OpenAI client lazily.
        openai ??= new OpenAI({
          apiKey: process.env.GEMINI_API_KEY,
          baseURL: GEMINI_API_ENDPOINT,
        });

        const text = await request.text();

        try {
          const completion = await openai.chat.completions.create({
            model: GEMINI_MODEL,
            temperature: 1,
            top_p: 0.7,
            presence_penalty: 0,
            max_completion_tokens: 2048,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    text,
                    type: 'text',
                  },
                ],
              },
            ],
          });

          return new Response(completion?.choices?.[0]?.message?.content, {
            status: 200,
            statusText: 'OK',
            headers: corsHeaders,
          });
        } catch (error) {
          if (error instanceof OpenAI.APIError) {
            return new Response(error.message, {
              status: error.status ?? 502,
              headers: corsHeaders,
            });
          } else {
            return new Response('Internal Server Error', {
              status: 500,
              headers: corsHeaders,
            });
          }
        }
      }

      case 'OPTIONS': {
        return new Response(null, {
          status: 204,
          statusText: 'No Content',
          headers: corsHeaders,
        });
      }

      default: {
        return new Response(`method ${request.method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: corsHeaders,
        });
      }
    }
  },
} as const;
