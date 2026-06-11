/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: [
    'apps/moing/**',
    '**/archives/**',
    '**/build/**',
    '**/coverage/**',
    '**/.next/**',
  ],
  rules: {
    'import-notation': 'string',
    // Enforce specific media feature breakpoints for consistency
    'media-feature-range-notation': 'context',
    'media-feature-name-allowed-list': ['width'],
    'media-feature-name-unit-allowed-list': {
      width: ['px'],
    },
    'media-feature-name-value-allowed-list': {
      width: [
        '640px', // sm
        '768px', // md
        '1024px', // lg
        '1280px', // xl
        '1536px', // 2xl
      ],
    },
  },
  overrides: [
    {
      files: ['**/markdown.css', '**/normalize.css'],
      rules: {
        'declaration-empty-line-before': null,
        'property-no-vendor-prefix': null,
      },
    },
  ],
};
