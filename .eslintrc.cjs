module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // can extent different rules
  // https://typescript-eslint.io/linting/configs#strict
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/all', // very strict, but cool
    // 'eslint:recommended', // https://typescript-eslint.io/linting/configs/
    'standard-with-typescript', // https://github.com/standard/eslint-config-standard-with-typescript#example-config
    'plugin:@conarti/feature-sliced/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    'build',
    '.eslintrc.cjs',
    'vite.config.ts',
    'node_modules',
    'test-setup.ts',
    'froalaPkg.js',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
