/**
 * @fileoverview Next.js configuration file.
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const isProd = process.env.NODE_ENV === 'production';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {import('next').NextConfig} */
export default {
  pageExtensions: ['js', 'mjs', 'jsx', 'ts', 'mts', 'tsx', 'md', 'mdx'],
  images: {
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
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  distDir: 'build',

  webpack(config) {
    // Add a rule to handle Markdown files as raw text.
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });

    return config;
  },
};
