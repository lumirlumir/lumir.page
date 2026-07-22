/**
 * @fileoverview scroll-progress.
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

import { useEffect, useRef } from 'react';
import { cn } from '@lumir/utils';
import styles from './scroll-progress.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function ScrollProgress() {
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollProgressRef.current) {
      return undefined;
    }

    let rafId: number | null = null;

    function requestProgressUpdate() {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          const roundedProgress = Math.round(progress * 1000) / 1000;
          const clampedProgress = Math.min(Math.max(roundedProgress, 0), 1);

          scrollProgressRef.current!.style.transform = `scaleX(${clampedProgress})`;

          rafId = null;
        });
      }
    }

    requestProgressUpdate();

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', requestProgressUpdate);
      window.removeEventListener('resize', requestProgressUpdate);
    };
  }, []);

  return (
    <div className={cn('scroll-progress', styles['scroll-progress'])}>
      <div ref={scrollProgressRef} className={styles['scroll-progress-bar']} />
    </div>
  );
}
