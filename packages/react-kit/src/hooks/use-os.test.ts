/**
 * @fileoverview Test for `use-os.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useOs } from './use-os.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-os', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('`Macintosh` user agent should return `macos`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'macos');
  });

  it('`MacIntel` user agent should return `macos`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (MacIntel)',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'macos');
  });

  it('`MacPPC` user agent should return `macos`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (MacPPC)',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'macos');
  });

  it('`Mac68K` user agent should return `macos`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Mac68K)',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'macos');
  });

  it('`iPhone` user agent should return `ios`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'ios');
  });

  it('`iPad` user agent should return `ios`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (iPad)');

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'ios');
  });

  it('`iPod` user agent should return `ios`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (iPod)');

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'ios');
  });

  it('Touch-enabled `Macintosh` user agent should return `ios` for iPad desktop mode', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15',
    );
    Object.defineProperty(document, 'ontouchend', {
      configurable: true,
      value: null,
    });

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'ios');

    Reflect.deleteProperty(document, 'ontouchend');
  });

  it('`Win32` user agent should return `windows`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Win32)');

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'windows');
  });

  it('`Win64` user agent should return `windows`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Win64)');

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'windows');
  });

  it('`Windows` user agent should return `windows`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Windows NT 10.0; x64) AppleWebKit/537.36',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'windows');
  });

  it('`WinCE` user agent should return `windows`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (WinCE)');

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'windows');
  });

  it('Android user agent should return `android` before matching Linux', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'android');
  });

  it('ChromeOS user agent should return `chromeos`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (X11; CrOS x86_64 16093.68.0) AppleWebKit/537.36',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'chromeos');
  });

  it('Linux user agent should return `linux`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'linux');
  });

  it('Unknown user agent should return `undetermined`', async () => {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (PlayStation 5 7.61) AppleWebKit/605.1.15',
    );

    const { result } = await renderHook(() => useOs());

    assert.strictEqual(result.current, 'undetermined');
  });
});
