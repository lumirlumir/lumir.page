/**
 * @fileoverview Next.js configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const isProd = process.env.NODE_ENV === 'production';
const isTypegen = process.argv.includes('typegen');
const isAnalyze = process.argv.includes('experimental-analyze');

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {import('next').NextConfig} */
export default {
  pageExtensions: ['js', 'mjs', 'jsx', 'ts', 'mts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true, // For static export, we need to disable image optimization.
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com', // Allow GitHub profile image.
      },
    ],
  },
  reactCompiler: true,
  // Remove `console.*` output except `console.warn` and `console.error` only in production.
  ...(isProd && {
    compiler: {
      removeConsole: {
        exclude: ['warn', 'error'],
      },
    },
  }),
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true, // Typecheck will be handled separately.
  },
  output: 'export', // For static export, we need to set output to 'export'.
  trailingSlash: false, // For static export, we don't want trailing slashes.
  skipTrailingSlashRedirect: true, // For static export, we don't want to redirect to trailing slashes.
  distDir: isTypegen || isAnalyze ? '.next' : 'build', // For static export, use a separate dist directory to prevent type generation conflicts.
  turbopack: {
    rules: {
      '*.md': {
        loaders: [
          fileURLToPath(new URL('./src/plugins/markdown-loader.js', import.meta.url)),
        ],
        as: '*.js',
      },
    },
  },
};
