'use strict';

module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: true,
  semi: true,
  jsxSingleQuote: true,
  arrowParents: 'avoid',
  singleAttributePerLine: true,
  importOrder: [
    "^@core/(.*)$",
    '<THIRD_PARTY_MODULES>',
    '^@components/(.*)$',
    "^@server/(.*)$",
    '^@layout/(.*)$',
    '^@ui/(.*)$',
    '^@providers/(.*)$',
    '^@constants/(.*)$',
    '^@types/(.*)$',
    '^@assets/(.*)$',
    '^@config/(.*)$',
    '^@store/(.*)$',
    '^@hooks/(.*)$',
    '^@utils/(.*)$',
    '^@api/(.*)$',
    '^../(.*)',
    '^./(.*)',
    '(.scss)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
