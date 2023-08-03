module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // can extent different rules
  // https://typescript-eslint.io/linting/configs#strict
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/all', // very strict, but cool
    // 'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  ignorePatterns: ['dist', 'build', '.eslintrc.cjs', 'vite.config.ts', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    'jsx-quotes': ['warn', 'prefer-single'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-console': ['warn', { allow: ['error'] }],
    quotes: [2, 'single', { avoidEscape: true }],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
}
