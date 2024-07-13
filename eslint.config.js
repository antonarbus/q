import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import prettierConfig from 'eslint-config-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['**/build/', '**/froalaPkg.js'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  pluginReactConfig,
  { settings: { react: { version: 'detect' } } },
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  prettierConfig,
  {
    rules: {
      'jsx-quotes': ['error', 'prefer-single'],
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
  },
]
