/**
 * @fileoverview Test for `chat.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { ALLOW_ORIGINS } from '../core/constants.js';
import chat from './chat.js';

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

const { APIErrorMock, createMock, OpenAIMock } = vi.hoisted(() => {
  const completionCreateMock = vi.fn();

  class MockAPIError extends Error {
    status: number | undefined;

    constructor(message: string, status?: number) {
      super(message);
      this.status = status;
    }
  }

  function OpenAIMockImplementation() {
    return {
      chat: {
        completions: {
          create: completionCreateMock,
        },
      },
    };
  }

  const MockOpenAI = vi.fn(OpenAIMockImplementation);

  Object.assign(MockOpenAI, {
    APIError: MockAPIError,
  });

  return {
    APIErrorMock: MockAPIError,
    createMock: completionCreateMock,
    OpenAIMock: MockOpenAI,
  };
});

vi.mock('openai', () => ({
  default: OpenAIMock,
}));

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

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('chat', () => {
  afterEach(() => {
    createMock.mockReset();
    OpenAIMock.mockClear();
    vi.unstubAllEnvs();
  });

  describe('when the request metadata is not allowed', () => {
    it('should reject unauthorized origins without cors headers', async () => {
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
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.strictEqual(response.headers.get('Access-Control-Allow-Methods'), null);
      assert.strictEqual(response.headers.get('Allow'), null);
      assert.strictEqual(await response.text(), '');
    });
  });

  describe('when the endpoint is disabled', () => {
    it('should return a service unavailable response with cors headers', async () => {
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
    it('should accept application json content types without parameters', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');
      createMock.mockResolvedValueOnce({ choices: [] });

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
      assert.strictEqual(createMock.mock.calls.length, 1);
    });

    it('should accept application json content types case insensitively', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');
      createMock.mockResolvedValueOnce({ choices: [] });

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
      assert.strictEqual(createMock.mock.calls.length, 1);
    });

    it('should accept application json content types with charset parameters', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');
      createMock.mockResolvedValueOnce({ choices: [] });

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
      assert.strictEqual(createMock.mock.calls.length, 1);
    });

    it('should accept application json content types with whitespace before parameters', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');
      createMock.mockResolvedValueOnce({ choices: [] });

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
      assert.strictEqual(createMock.mock.calls.length, 1);
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
      assert.strictEqual(createMock.mock.calls.length, 0);
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
      assert.strictEqual(createMock.mock.calls.length, 0);
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
      assert.strictEqual(createMock.mock.calls.length, 0);
    });

    it('should reject unsupported content types with cors headers', async () => {
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
          body: 'x'.repeat(8_193),
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
      assert.strictEqual(await response.text(), 'Invalid parameters');
    });

    it('should return a chat completion response with fixed and dynamic parameters', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');

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

      createMock.mockResolvedValueOnce(completion);

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
            verbosity: 'low',
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
      assert.deepStrictEqual(await response.json(), completion);
      assert.strictEqual(createMock.mock.calls.length, 1);
      assert.deepStrictEqual(createMock.mock.calls[0]?.[0], {
        model: 'gemini-3.1-flash-lite',
        presence_penalty: 0,
        prompt_cache_retention: '24h',
        stream: false,
        top_p: 1,
        messages: [{ role: 'user', content: 'hello' }],
        max_completion_tokens: 128,
        reasoning_effort: 'low',
        temperature: 0.2,
        verbosity: 'low',
      });
    });

    it('should cap requested completion tokens at the endpoint limit', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');
      createMock.mockResolvedValueOnce({ choices: [] });

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
      assert.strictEqual(createMock.mock.calls.length, 1);
      assert.strictEqual(createMock.mock.calls[0]?.[0].max_completion_tokens, 2_048);
    });

    it('should return the upstream status for openai api errors without exposing the message', async () => {
      vi.stubEnv('GEMINI_API_KEY', 'test-gemini-api-key');
      createMock.mockRejectedValueOnce(
        new APIErrorMock('upstream rate limit details', 429),
      );

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

    it('should accept OPTIONS preflight requested content type headers', async () => {
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
        response.headers.get('Access-Control-Allow-Headers'),
        'Content-Type',
      );
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
