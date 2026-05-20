/**
 * @fileoverview Chat endpoint for API routes.
 * @see https://vercel.com/docs/functions
 * @see https://aistudio.google.com
 * @see https://ai.google.dev/gemini-api/docs
 * @see https://ai.google.dev/gemini-api/docs/openai
 * @see https://developers.openai.com/api/docs/models/gpt-5-nano
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ALLOWED_ORIGINS } from '../src/constants.ts';
import { createCORSHeaders } from '../src/cors.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const allowedMethods = 'GET, HEAD, OPTIONS, POST';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/api/chat` API route handler.
 */
export default {
  fetch(request: Request) {
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

    if (
      origin === null ||
      !ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number])
    ) {
      return new Response(null, {
        status: 403,
        statusText: 'Forbidden',
      });
    }

    switch (request.method) {
      case 'POST': {
        return new Response(null, {
          status: 200,
          statusText: 'OK',
          headers: createCORSHeaders(origin, allowedMethods),
        });
      }

      default: {
        return new Response(`method ${request.method} is not allowed`, {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: createCORSHeaders(origin, allowedMethods),
        });
      }
    }
  },
} as const;
