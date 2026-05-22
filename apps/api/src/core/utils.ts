/**
 * @fileoverview Utility functions for API routes.
 *
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Creates CORS headers for API routes.
 * @param origin The allowed origin for the API route.
 * @param methods The allowed HTTP methods for the API route.
 * @returns A Headers object containing the appropriate CORS headers.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Methods
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary
 */
export function createCORSHeaders(origin: string, methods: string): Headers {
  return new Headers({
    'Access-Control-Allow-Origin': origin, // CORS
    'Access-Control-Allow-Methods': methods, // CORS
    Allow: methods,
    Vary: 'Origin',
  });
}
