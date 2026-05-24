/**
 * @fileoverview Test for `ping.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import ping from './ping.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const REQUEST_URL = 'https://api.example.com/api/ping';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('ping', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('when the endpoint is disabled', () => {
    it('should return a service unavailable response with public health check headers', async () => {
      vi.stubEnv('DISABLE_PING', 'true');

      const response = ping.fetch(new Request(REQUEST_URL, { method: 'GET' }));

      assert.strictEqual(response.status, 503);
      assert.strictEqual(response.statusText, 'Service Unavailable');
      assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), '*');
      assert.strictEqual(
        response.headers.get('Access-Control-Allow-Methods'),
        'GET, HEAD, OPTIONS',
      );
      assert.strictEqual(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
      assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
      assert.strictEqual(await response.text(), '');
    });
  });

  describe('when the endpoint is enabled', () => {
    describe('GET', () => {
      it('should return `pong` for a GET request', async () => {
        const response = ping.fetch(new Request(REQUEST_URL, { method: 'GET' }));

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), '*');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'GET, HEAD, OPTIONS',
        );
        assert.strictEqual(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(await response.text(), 'pong');
      });

      it('should allow requests from any origin', async () => {
        const response = ping.fetch(
          new Request(REQUEST_URL, {
            method: 'GET',
            headers: {
              Origin: 'https://example.com',
            },
          }),
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), '*');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'GET, HEAD, OPTIONS',
        );
        assert.strictEqual(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(await response.text(), 'pong');
      });
    });

    describe('HEAD', () => {
      it('should return an empty successful response for a HEAD request', async () => {
        const response = ping.fetch(new Request(REQUEST_URL, { method: 'HEAD' }));

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.statusText, 'OK');
        assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), '*');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'GET, HEAD, OPTIONS',
        );
        assert.strictEqual(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(await response.text(), '');
      });
    });

    describe('OPTIONS', () => {
      it('should return an empty no content response for an OPTIONS request', async () => {
        const response = ping.fetch(new Request(REQUEST_URL, { method: 'OPTIONS' }));

        assert.strictEqual(response.status, 204);
        assert.strictEqual(response.statusText, 'No Content');
        assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), '*');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'GET, HEAD, OPTIONS',
        );
        assert.strictEqual(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(await response.text(), '');
      });
    });

    describe('DEFAULT', () => {
      it('should reject unsupported methods with allowed method headers', async () => {
        const response = ping.fetch(new Request(REQUEST_URL, { method: 'POST' }));

        assert.strictEqual(response.status, 405);
        assert.strictEqual(response.statusText, 'Method Not Allowed');
        assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), '*');
        assert.strictEqual(
          response.headers.get('Access-Control-Allow-Methods'),
          'GET, HEAD, OPTIONS',
        );
        assert.strictEqual(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
        assert.strictEqual(response.headers.get('Cache-Control'), 'no-store');
        assert.strictEqual(await response.text(), 'method POST is not allowed');
      });
    });
  });
});
