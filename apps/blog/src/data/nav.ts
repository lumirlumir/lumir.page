/**
 * @fileoverview Defines the order, paths, and localized names for the navigation.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { LangRecord } from './lang';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the keys for the navigation items.
 */
export type NavKey = (typeof navKeys)[number];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Supported navigation keys in display order.
 */
export const navKeys = [
  'home',
  'posts',
  'snippet',
  'contribution',
  'project',
  'community',
  'about',
] as const;

/**
 * Each pathname is relative to the language root.
 */
export const navMeta = {
  home: {
    pathname: '',
    name: {
      en: 'home',
      ko: '처음으로',
    },
  },
  posts: {
    pathname: '',
    name: {
      en: 'posts',
      ko: '긴 글',
    },
  },
  snippet: {
    pathname: '',
    name: {
      en: 'snippet',
      ko: '짧은 글',
    },
  },
  contribution: {
    pathname: '',
    name: {
      en: 'contribution',
      ko: '오픈소스 기여',
    },
  },
  project: {
    pathname: '',
    name: {
      en: 'project',
      ko: '프로젝트',
    },
  },
  community: {
    pathname: '',
    name: {
      en: 'community',
      ko: '커뮤니티',
    },
  },
  about: {
    pathname: '',
    name: {
      en: 'about',
      ko: '소개',
    },
  },
} as const satisfies Record<NavKey, { pathname: string; name: LangRecord }>;
