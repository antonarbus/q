import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: [
      '**/build/',
      '**/froalaPkg.js',
      '**/coverage/',
      '**/node_modules/',
      '/',
    ],
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  { settings: { react: { version: 'detect' } } },
  // pluginJs.configs.recommended,
  pluginJs.configs.all,
  pluginReactConfig,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.all,
  prettierConfig,
  {
    rules: {
      // https://eslint.org/docs/v8.x/rules/
      'object-shorthand': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
      'no-useless-rename': 'error',
      'no-duplicate-imports': 'error',
      // turn off strange rules from pluginJs.configs.all
      'no-useless-assignment': 'off',
      'sort-keys': 'off',
      'max-lines-per-function': 'off',
      'no-ternary': 'off',
      'arrow-body-style': 'off',
      'no-inline-comments': 'off',
      'capitalized-comments': 'off',
      'no-magic-numbers': 'off',
      'no-void': 'off',
      'one-var': 'off',
      'id-length': 'off',
      'prefer-destructuring': 'off',
      'max-statements': 'off',
      'sort-imports': 'off',
      'max-params': 'off',
      'no-warning-comments': 'off',
      'no-undefined': 'off',
      'max-lines': 'off',
      complexity: 'off',
      'consistent-return': 'off',
      'no-plusplus': 'off',
      'func-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-shadow': 'off',
      radix: 'off',
      'init-declarations': 'off',
      'new-cap': 'off',
      // https://typescript-eslint.io/rules/
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // turn off strange rules from tseslint.configs.all
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off', // good to use, but to much changes required
      '@typescript-eslint/no-unnecessary-type-parameters': 'off', // check it later, it may make sense
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/consistent-return': 'off',

      // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#list-of-supported-rules
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
  },
]
