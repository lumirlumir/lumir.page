/**
 * @fileoverview Local dev server for API routes.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import http from 'node:http';
import { DEV_SERVER_PORT, DEV_SERVER_URL } from '../src/constants.ts';
import chat from '../api/chat.ts';
import ping from '../api/ping.ts';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Defines the available API routes and their corresponding handler functions.
 */
const routes = new Map<
  string,
  {
    fetch(request: Request): Response | Promise<Response>;
  }
>([
  ['/api/chat', chat],
  ['/api/ping', ping],
]);

/**
 * Sends a plain text response with the given status code and text.
 */
function sendTextResponse(res: http.ServerResponse, statusCode: number, text: string) {
  const headers = {
    'Content-Type': 'text/plain; charset=UTF-8',
  } as const;

  res.writeHead(statusCode, headers);
  res.end(text);
}

// --------------------------------------------------------------------------------
// Server
// --------------------------------------------------------------------------------

http
  .createServer(async (req, res) => {
    if (Math.random() < 0.1) {
      sendTextResponse(res, 500, 'Internal Server Error: Simulated random server error');
      return;
    }

    // If the request is missing a method or URL, respond with a 400 Bad Request error.
    if (!req.method || !req.url) {
      sendTextResponse(res, 400, 'Bad Request: Missing method or URL');
      return;
    }

    const url = URL.parse(req.url, DEV_SERVER_URL);

    // If the URL is invalid, respond with a 400 Bad Request error.
    if (!url) {
      sendTextResponse(res, 400, 'Bad Request: Invalid URL');
      return;
    }

    // If the URL has an 'error' query parameter, respond with a 500 Internal Server Error to simulate an error condition.
    if (url.searchParams.has('error')) {
      sendTextResponse(res, 500, 'Internal Server Error: Simulated server error');
      return;
    }

    const handler = routes.get(url.pathname);

    // If there is no handler for the requested pathname, respond with a 404 Not Found error.
    if (!handler) {
      sendTextResponse(res, 404, 'Not Found: No route handler for this pathname');
      return;
    }

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

    let body = '';

    if (hasBody) {
      for await (const chunk of req) {
        body += chunk;
      }
    }

    const response = await handler.fetch(
      new Request(url, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: hasBody ? body : null,
      }),
    );

    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  })
  .listen(DEV_SERVER_PORT);
