/**
 * @fileoverview Consumer-controlled cursor splash effect.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'client-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { CursorSplash as CursorSplashOriginal } from '@lumir/react-kit/components';
import { useEffect } from 'react';
import { useConfigContext } from '@/contexts/config';
import styles from './cursor-splash.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const cursorSplashMediaQuery =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders the cursor splash effect when the consumer media query matches.
 */
export function CursorSplash() {
  const [{ cursorSplash }, setConfig] = useConfigContext();

  useEffect(() => {
    const mediaQueryList = window.matchMedia(cursorSplashMediaQuery);

    function updateEnabled() {
      setConfig(config => ({
        ...config,
        cursorSplash: mediaQueryList.matches,
      }));
    }

    updateEnabled();
    mediaQueryList.addEventListener('change', updateEnabled);

    return () => {
      mediaQueryList.removeEventListener('change', updateEnabled);
    };
  }, [setConfig]);

  if (!cursorSplash) {
    return null;
  } else {
    return (
      <CursorSplashOriginal className={styles['cursor-splash']} aria-hidden="true" />
    );
  }
}
