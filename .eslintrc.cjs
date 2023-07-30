module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // can extent different rules
  // https://typescript-eslint.io/linting/configs#strict
  extends: [
    'plugin:@typescript-eslint/all', // very strict, but cool
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  ignorePatterns: [
    'dist',
    'build',
    '.eslintrc.cjs',
    'vite.config.ts',
    'node_modules'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@typescript-eslint'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["tsconfig.json"] ,
  },
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
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': 'off',
    // 'object-curly-spacing': ["error", "always"],
    // '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    "space-before-function-paren": ["error", "never"],
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-console': ['warn', {
      allow: ['error'],
    }],
    // "@typescript-eslint/consistent-type-exports": "warn",
    // "@typescript-eslint/consistent-type-imports": "warn",
    "quotes": [2, "single", { "avoidEscape": true }]
  },
}
