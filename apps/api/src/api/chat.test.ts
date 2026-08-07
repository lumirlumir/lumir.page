/**
 * @fileoverview Test for `chat.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import chat from './chat.js';
import { ALLOW_ORIGINS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const REQUEST_URL = 'https://api.example.com/api/chat';
const ALLOW_ORIGIN = ALLOW_ORIGINS[0];
const CORS_REQUEST_HEADERS = {
  Origin: ALLOW_ORIGIN,
  'User-Agent': 'User-Agent for tests',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
} as const;

const fetchStub = vi.spyOn(globalThis, 'fetch');

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('chat', () => {
  afterEach(() => {
    fetchStub.mockReset();
    vi.unstubAllEnvs();
  });

  describe('when the request metadata is not allowed', () => {
    it('should reject missing `Origin`', async () => {
      const headers = new Headers({
        ...CORS_REQUEST_HEADERS,
        'Content-Type': 'application/json',
      });

      headers.delete('Origin');

      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 403);
      assert.strictEqual(response.statusText, 'Forbidden');
      // Should not return CORS headers.
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(response.headers.get('Vary'), null);
      assert.strictEqual(await response.text(), '');
    });

    it('should reject unauthorized `Origin`', async () => {
      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers: {
            ...CORS_REQUEST_HEADERS,
            Origin: 'https://example.com',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 403);
      assert.strictEqual(response.statusText, 'Forbidden');
      // Should not return CORS headers.
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(response.headers.get('Vary'), null);
      assert.strictEqual(await response.text(), '');
    });

    it('should reject missing `User-Agent`', async () => {
      const headers = new Headers({
        ...CORS_REQUEST_HEADERS,
        'Content-Type': 'application/json',
      });

      headers.delete('User-Agent');

      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 403);
      assert.strictEqual(response.statusText, 'Forbidden');
      // Should not return CORS headers.
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(response.headers.get('Vary'), null);
      assert.strictEqual(await response.text(), '');
    });

    it('should reject unexpected `Sec-Fetch-Dest`', async () => {
      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers: {
            ...CORS_REQUEST_HEADERS,
            'Content-Type': 'application/json',
            'Sec-Fetch-Dest': 'document',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 403);
      assert.strictEqual(response.statusText, 'Forbidden');
      // Should not return CORS headers.
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(response.headers.get('Vary'), null);
      assert.strictEqual(await response.text(), '');
    });

    it('should reject unexpected `Sec-Fetch-Mode`', async () => {
      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers: {
            ...CORS_REQUEST_HEADERS,
            'Content-Type': 'application/json',
            'Sec-Fetch-Mode': 'navigate',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 403);
      assert.strictEqual(response.statusText, 'Forbidden');
      // Should not return CORS headers.
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(response.headers.get('Vary'), null);
      assert.strictEqual(await response.text(), '');
    });

    it('should reject unexpected `Sec-Fetch-Site`', async () => {
      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers: {
            ...CORS_REQUEST_HEADERS,
            'Content-Type': 'application/json',
            'Sec-Fetch-Site': 'cross-site',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 403);
      assert.strictEqual(response.statusText, 'Forbidden');
      // Should not return CORS headers.
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Headers'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(response.headers.get('Vary'), null);
      assert.strictEqual(await response.text(), '');
    });
  });

  describe('when the endpoint is disabled', () => {
    it('should return a service unavailable response', async () => {
      vi.stubEnv('DISABLE_CHAT', 'true');

      const response = await chat.fetch(
        new Request(REQUEST_URL, {
          method: 'POST',
          headers: {
            ...CORS_REQUEST_HEADERS,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'hello' }],
          }),
        }),
      );

      assert.strictEqual(response.status, 503);
      assert.strictEqual(response.statusText, 'Service Unavailable');
      assert.strictEqual(
        response.headers.get('Access-Control-Allow-Origin'),
        ALLOW_ORIGIN,
      );
      assert.strictEqual(
        response.headers.get('Access-Control-Allow-Methods'),
        'POST, OPTIONS',
      );
      assert.strictEqual(
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
      assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
      assert.strictEqual(response.headers.get('Vary'), 'Origin');
      assert.strictEqual(await response.text(), '');
    });
  });

  describe('when the endpoint is enabled', () => {
    describe('POST', () => {
      it('should accept application json content types without parameters', async () => {
        fetchStub.mockResolvedValueOnce(new Response(JSON.stringify({ choices: [] })));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.deepStrictEqual(await response.json(), { choices: [] });
      });

      it('should accept application json content types case insensitively', async () => {
        fetchStub.mockResolvedValueOnce(new Response(JSON.stringify({ choices: [] })));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'Application/JSON',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.deepStrictEqual(await response.json(), { choices: [] });
      });

      it('should accept application json content types with charset parameters', async () => {
        fetchStub.mockResolvedValueOnce(new Response(JSON.stringify({ choices: [] })));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.deepStrictEqual(await response.json(), { choices: [] });
      });

      it('should accept application json content types with whitespace before parameters', async () => {
        fetchStub.mockResolvedValueOnce(new Response(JSON.stringify({ choices: [] })));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json ; charset=utf-8',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.deepStrictEqual(await response.json(), { choices: [] });
      });

      it('should reject application jsonp content types', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/jsonp',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 415);
        assert.strictEqual(response.statusText, 'Unsupported Media Type');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), '');
      });

      it('should reject structured suffix application json content types', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json+xml',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 415);
        assert.strictEqual(response.statusText, 'Unsupported Media Type');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), '');
      });

      it('should reject text plain content types that mention application json as a parameter', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'text/plain; application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 415);
        assert.strictEqual(response.statusText, 'Unsupported Media Type');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), '');
      });

      it('should reject unsupported content types', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'text/plain',
            },
            body: 'hello',
          }),
        );

        assert.strictEqual(response.status, 415);
        assert.strictEqual(response.statusText, 'Unsupported Media Type');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), '');
      });

      it('should reject request bodies that exceed the byte limit', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: 'x'.repeat(32_769), // 32KB + 1 byte
          }),
        );

        assert.strictEqual(response.status, 413);
        assert.strictEqual(response.statusText, 'Payload Too Large');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), '');
      });

      it('should reject invalid json request bodies', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: '{',
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), 'Invalid JSON');
      });

      it('should reject invalid chat completion parameters', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
              temperature: 'hot',
            }),
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(fetchStub.mock.calls.length, 0);
        assert.strictEqual(await response.text(), 'Invalid parameters');
      });

      it('should return a chat completion response with fixed and dynamic parameters', async () => {
        const completion = {
          id: 'chatcmpl_test',
          choices: [
            {
              index: 0,
              finish_reason: 'stop',
              message: {
                role: 'assistant',
                content: 'hello back',
              },
            },
          ],
        };

        fetchStub.mockResolvedValueOnce(new Response(JSON.stringify(completion)));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
              max_completion_tokens: 128,
              reasoning_effort: 'low',
              temperature: 0.2,
            }),
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(response.headers.get('Content-Type'), 'application/json');
        assert.deepStrictEqual(await response.json(), completion);
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.strictEqual(
          fetchStub.mock.calls[0][0],
          'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
        );
        assert.strictEqual(fetchStub.mock.calls[0][1]?.method, 'POST');
        assert.strictEqual(fetchStub.mock.calls[0][1]?.cache, 'no-store');
        assert.deepStrictEqual(fetchStub.mock.calls[0][1]?.headers, {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-gemini-api-key',
        });
        assert.deepStrictEqual(JSON.parse(fetchStub.mock.calls[0][1]?.body as string), {
          model: 'gemini-3.1-flash-lite',
          presence_penalty: 0,
          stream: false,
          top_p: 1,
          messages: [{ role: 'user', content: 'hello' }],
          max_completion_tokens: 128,
          reasoning_effort: 'low',
          temperature: 0.2,
        });
      });

      it('should cap requested completion tokens at the endpoint limit', async () => {
        fetchStub.mockResolvedValueOnce(new Response(JSON.stringify({ choices: [] })));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
              max_completion_tokens: 4_096,
            }),
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.strictEqual(
          JSON.parse(fetchStub.mock.calls[0][1]?.body as string).max_completion_tokens,
          2_048,
        );
        assert.deepStrictEqual(await response.json(), { choices: [] });
      });

      it('should return bad gateway for upstream fetch failures', async () => {
        fetchStub.mockRejectedValueOnce(new Error('unexpected failure'));
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 502);
        assert.strictEqual(response.statusText, 'Bad Gateway');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.strictEqual(await response.text(), '');
      });

      it('should return the upstream status for fetch error responses without exposing the message', async () => {
        fetchStub.mockResolvedValueOnce(
          new Response('upstream rate limit details', {
            status: 429,
            statusText: 'Too Many Requests',
          }),
        );
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 429);
        assert.strictEqual(response.statusText, 'Too Many Requests');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.strictEqual(await response.text(), '');
      });

      it('should return bad gateway when the upstream response body cannot be read', async () => {
        fetchStub.mockResolvedValueOnce(
          new Response(
            new ReadableStream({
              start(controller) {
                controller.error(new Error('upstream body failure'));
              },
            }),
          ),
        );
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'POST',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: 'hello' }],
            }),
          }),
        );

        assert.strictEqual(response.status, 502);
        assert.strictEqual(response.statusText, 'Bad Gateway');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(fetchStub.mock.calls.length, 1);
        assert.strictEqual(await response.text(), '');
      });
    });

    describe('OPTIONS', () => {
      it('should return an empty no content response for a valid OPTIONS preflight request', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'content-type',
            },
          }),
        );

        assert.strictEqual(response.status, 204);
        assert.strictEqual(response.statusText, 'No Content');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should reject OPTIONS preflight requests for unsupported methods', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'GET',
              'Access-Control-Request-Headers': 'content-type',
            },
          }),
        );

        assert.strictEqual(response.status, 405);
        assert.strictEqual(response.statusText, 'Method Not Allowed');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should reject OPTIONS preflight requests without requested content type headers', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
            },
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should accept OPTIONS preflight requested content type headers case insensitively', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'Content-Type',
            },
          }),
        );

        assert.strictEqual(response.status, 204);
        assert.strictEqual(response.statusText, 'No Content');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should accept OPTIONS preflight requested content type headers with leading whitespace', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': '  content-type',
            },
          }),
        );

        assert.strictEqual(response.status, 204);
        assert.strictEqual(response.statusText, 'No Content');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should accept OPTIONS preflight requested content type headers with trailing whitespace', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'content-type  ',
            },
          }),
        );

        assert.strictEqual(response.status, 204);
        assert.strictEqual(response.statusText, 'No Content');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should reject OPTIONS preflight requested content type headers with extra authorization headers', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'content-type, authorization',
            },
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should reject OPTIONS preflight requested authorization headers before content type headers', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'authorization, content-type',
            },
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should reject OPTIONS preflight requested content type headers with prefixes', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'x-content-type',
            },
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });

      it('should reject OPTIONS preflight requested content type headers with suffixes', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'OPTIONS',
            headers: {
              ...CORS_REQUEST_HEADERS,
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': 'content-type-extra',
            },
          }),
        );

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.statusText, 'Bad Request');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), '');
      });
    });

    describe('DEFAULT', () => {
      it('should reject unsupported methods with allowed method headers', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

        const response = await chat.fetch(
          new Request(REQUEST_URL, {
            method: 'GET',
            headers: CORS_REQUEST_HEADERS,
          }),
        );

        assert.strictEqual(response.status, 405);
        assert.strictEqual(response.statusText, 'Method Not Allowed');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Origin'),
          ALLOW_ORIGIN,
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'POST, OPTIONS',
        );
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Headers'),
          'Content-Type',
        );
        assert.strictEqual(response.headers.get('Allow'), 'POST, OPTIONS');
        assert.strictEqual(response.headers.get('Vary'), 'Origin');
        assert.strictEqual(await response.text(), 'method GET is not allowed');
      });
    });
  });
});
