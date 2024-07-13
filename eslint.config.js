import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['**/build/', '**/froalaPkg.js'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // PluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  pluginJs.configs.all,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginReactConfig,
  { settings: { react: { version: 'detect' } } },
  prettierConfig,
  {
    // https://eslint.org/docs/v8.x/rules/
    rules: {
      'jsx-quotes': ['error', 'prefer-single'],
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      // 'no-useless-rename': 'error',
      // 'no-duplicate-imports': 'error',
      'no-useless-assignment': 'off',
      'sort-keys': 'off',
      'max-statements': 'off',
      'max-lines-per-function': 'off',
      'no-ternary': 'off',
      'arrow-body-style': 'off',
      'no-magic-numbers': 'off',
      'no-void': 'off',
      'sort-imports': 'off',
      'sort-vars': 'off',
      'id-length': 'off',
      'consistent-return': 'off',
      'no-warning-comments': 'off',
      'one-var': 'off',
      'capitalized-comments': 'off',
      'no-undefined': 'off',
      'no-inline-comments': 'off',
      'max-params': 'off',
      'prefer-destructuring': 'off',
      'max-lines': 'off',
      'func-style': 'off',
      complexity: 'off',
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
          allowNamedExports: false,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'all',
          ignoreRestSiblings: true,
        },
      ],
      // '@typescript-eslint/explicit-function-return-type': 'error',
      'no-plusplus': 'off',
      'react/display-name': 'off',
      'init-declarations': 'off',
      'new-cap': 'off',
    },
  },
]
