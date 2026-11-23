/**
 * @fileoverview Defines the order, paths, and localized names for the navigation.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Meta } from '@/data/meta';

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
  'snippets',
  'contributions',
  'projects',
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
      en: 'Home',
      ko: '처음으로',
    },
  },
  posts: {
    pathname: '/posts',
    name: {
      en: 'Posts',
      ko: '긴 글',
    },
  },
  snippets: {
    pathname: '/snippets',
    name: {
      en: 'Snippets',
      ko: '짧은 글',
    },
  },
  contributions: {
    pathname: '/contributions',
    name: {
      en: 'Contributions',
      ko: '오픈소스 기여',
    },
  },
  projects: {
    pathname: '/projects',
    name: {
      en: 'Projects',
      ko: '프로젝트',
    },
  },
  community: {
    pathname: '/community',
    name: {
      en: 'Community',
      ko: '커뮤니티',
    },
  },
  about: {
    pathname: '/about',
    name: {
      en: 'About',
      ko: '소개',
    },
  },
} as const satisfies Record<
  NavKey,
  { pathname: '' | `/${Exclude<NavKey, 'home'>}` } & Meta
>;
