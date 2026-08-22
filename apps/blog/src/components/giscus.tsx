/**
 * @fileoverview giscus.
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

import GiscusOriginal from '@giscus/react';
import { useThemeContext } from '@/contexts/theme';
import { type PropsWithLang } from '@/data/lang';
import { githubRepoFullName } from '@/data/site';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Giscus component for embedding comments section.
 */
export function Giscus({ lang }: PropsWithLang) {
  const [theme] = useThemeContext();

  return (
    <GiscusOriginal
      repo={githubRepoFullName}
      repoId="R_kgDOLa_QgA"
      category="comments"
      categoryId="DIC_kwDOLa_QgM4ChivI"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang={lang}
      loading="lazy"
    />
  );
}
