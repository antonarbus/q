module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // can extent different rules
  // https://typescript-eslint.io/linting/configs#strict
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/all', // very strict, but cool
    // 'eslint:recommended', // https://typescript-eslint.io/linting/configs/
    'standard-with-typescript' // https://github.com/standard/eslint-config-standard-with-typescript#example-config
  ],
  ignorePatterns: ['dist', 'build', '.eslintrc.cjs', 'vite.config.ts', 'node_modules', 'test-setup.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  parserOptions: {
    ecmaFeatures: { jsx: true, },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': ['error', { allow: ['error', 'warn', 'info'] }], // no console.log(), but allow console.error/warn()
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-misused-promises': ['error', { 'checksVoidReturn': false }],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/unbound-method': 'off', // new rule after upgrade, not clear, take a look later
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/quotes': 'off',
    // 'semi': ['error', 'never'],
    // '@typescript-eslint/semi': ['error', 'never'],
    // '@typescript-eslint/member-delimiter-style': 'off',
    // '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    // '@typescript-eslint/no-magic-numbers': 'off',
    // '@typescript-eslint/no-extra-parens': 'off',
    // '@typescript-eslint/naming-convention': 'off',
    // '@typescript-eslint/strict-boolean-expressions': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // 'object-curly-spacing': 'off',
    // '@typescript-eslint/object-curly-spacing': 'off',
    // 'no-restricted-syntax': ['error', 'FunctionExpression', 'FunctionDeclaration'],
    // 'space-before-function-paren': 'off',
    // '@typescript-eslint/no-misused-promises': ['error', { 'checksVoidReturn': false }],
    // 'object-shorthand': ['error', 'always']
  },
}
