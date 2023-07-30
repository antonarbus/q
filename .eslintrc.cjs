module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jsx-quotes': ['warn', 'prefer-single'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
    }],
    '@typescript-eslint/comma-dangle': 'off',
    'no-console': ['warn', {
      allow: ['error'],
    }],
    // "@typescript-eslint/consistent-type-exports": "error",
    // "@typescript-eslint/consistent-type-imports": "error",
  },
}
