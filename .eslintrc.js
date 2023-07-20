module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  ignorePatterns: ['build/'],
  rules: {
    'jsx-quotes': ['warn', 'prefer-single'],
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-children-prop': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
    }],
    'no-console': ['warn', {
      allow: ['error'],
    }],
    '@typescript-eslint/comma-dangle': 'off',
  },
}
