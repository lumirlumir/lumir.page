/** @type {import('lint-staged').Configuration} */
export default {
  '*': [
    'prettier --write --ignore-unknown',
    'editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,md}': 'eslint --fix --cache --cache-strategy content',
  '*.css': 'stylelint --fix',
  '*.md': 'markdownlint --fix',
  '*.{h,c,cpp}': 'clang-format -i',
};
