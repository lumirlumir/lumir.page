/**
 * @fileoverview `useOs` hook.
 * @see https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-os/use-os.ts
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useSyncExternalStore } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Operating systems recognized by `useOs`.
 */
export type UseOsReturn =
  'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux' | 'chromeos';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function isMacOs(userAgent: string) {
  return /(?:Macintosh|MacIntel|MacPPC|Mac68K)/i.test(userAgent);
}

function isIos(userAgent: string) {
  return /(?:iPhone|iPad|iPod)/i.test(userAgent);
}

function isWindows(userAgent: string) {
  return /(?:Win32|Win64|Windows|WinCE)/i.test(userAgent);
}

function isAndroid(userAgent: string) {
  return /Android/i.test(userAgent);
}

function isChromeOs(userAgent: string) {
  return /CrOS/i.test(userAgent);
}

function isLinux(userAgent: string) {
  return /Linux/i.test(userAgent);
}

function subscribeOs() {
  return () => undefined;
}

function getOsSnapshot(): UseOsReturn {
  const { userAgent } = window.navigator;

  if (isIos(userAgent) || (isMacOs(userAgent) && 'ontouchend' in document)) {
    return 'ios';
  }

  if (isMacOs(userAgent)) {
    return 'macos';
  }

  if (isWindows(userAgent)) {
    return 'windows';
  }

  if (isAndroid(userAgent)) {
    return 'android';
  }

  if (isChromeOs(userAgent)) {
    return 'chromeos';
  }

  if (isLinux(userAgent)) {
    return 'linux';
  }

  return 'undetermined';
}

function getServerOsSnapshot(): UseOsReturn {
  return 'undetermined';
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook that detects the user's operating system from the browser user agent.
 *
 * During server-side rendering, the hook returns `'undetermined'`. After hydration,
 * it returns the client operating system. The operating system is treated as static
 * for the lifetime of the page.
 *
 * @returns The detected operating system, or `'undetermined'` when it cannot be
 * identified.
 *
 * @example
 * ```tsx
 * import { useOs } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const os = useOs();
 *   const modifierKey = os === 'macos' ? 'Command' : 'Ctrl';
 *
 *   return <kbd>{modifierKey} + K</kbd>;
 * }
 * ```
 */
export function useOs(): UseOsReturn {
  return useSyncExternalStore(subscribeOs, getOsSnapshot, getServerOsSnapshot);
}
