/**
 * @fileoverview Test endpoint for API routes.
 * @see https://vercel.com/docs/functions
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `/test` API route handler.
 */
export default {
  fetch(request: Request) {
    return new Response(`Request received: ${request.method} ${request.url}`, {
      status: 200,
      statusText: 'OK',
    });
  },
} as const;

// res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // CORS
