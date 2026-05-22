/**
 * @fileoverview Chat endpoint for API routes.
 * @see https://vercel.com/docs/functions Vercel
 * @see https://aistudio.google.com Gemini
 * @see https://ai.google.dev/gemini-api/docs Gemini
 * @see https://ai.google.dev/api/generate-content Gemini
 * @see https://developers.openai.com/api/docs/models/gpt-5-nano OpenAI
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ALLOWED_ORIGINS } from '../core/constants.ts';
import { createCORSHeaders } from '../core/utils.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ALLOWED_METHODS = 'POST, OPTIONS';
const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

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
      });
    }

    const origin = request.headers.get('Origin');

    if (origin === null || !ALLOWED_ORIGINS.has(origin)) {
      return new Response(null, {
        status: 403,
        statusText: 'Forbidden',
      });
    }

    const corsHeaders = createCORSHeaders(origin, ALLOWED_METHODS);

    switch (request.method) {
      case 'POST': {
        const text = await request.text();
        const body = {
          contents: [
            {
              role: 'user',
              parts: [{ text }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 512,
            temperature: 0.7,
            thinkingConfig: {
              thinkingLevel: 'LOW',
            },
          },
        };

        const response = await fetch(GEMINI_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-goog-api-key': process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          return new Response(null, {
            status: response.status,
            statusText: response.statusText,
            headers: corsHeaders,
          });
        }

        const newText = await response.text();

        return new Response(newText, {
          status: 200,
          statusText: 'OK',
          headers: corsHeaders,
        });
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
