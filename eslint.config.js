import globals from 'globals'
import pluginJs from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  {
    files: [
      'back/*.{js,mjs,cjs,ts,jsx,tsx}',
      'front/*.{js,mjs,cjs,ts,jsx,tsx}',
      'steiger.config.ts',
    ],
  },
  {
    ignores: [
      '**/build/',
      '**/froalaPkg.js',
      '**/coverage/',
      '**/node_modules/',
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigDirName: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
  },
  { settings: { react: { version: '19' } } },
  pluginJs.configs.all,
  reactPlugin.configs.flat.recommended,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.all,
  prettierConfig,
  {
    rules: {
      // https://eslint.org/docs/v8.x/rules/
      'padding-line-between-statements': [
        'error',
        // blank line before return statement
        { blankLine: 'always', prev: '*', next: 'return' },
        // blank line around block statement
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        // blank line before throw statement
        { blankLine: 'always', prev: '*', next: 'throw' },
        // blank line around declaration which spans over several lines
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
        { blankLine: 'always', prev: 'multiline-let', next: '*' },
        { blankLine: 'always', prev: 'multiline-var', next: '*' },
        { blankLine: 'always', prev: '*', next: 'multiline-const' },
        { blankLine: 'always', prev: '*', next: 'multiline-let' },
        { blankLine: 'always', prev: '*', next: 'multiline-var' },
        // blank line around expression which spans over several lines
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },
        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
      ],
      curly: 'error',
      'no-else-return': 'error',
      'no-negated-condition': 'error',
      'no-implicit-coercion': 'error',
      eqeqeq: 'error',
      'object-shorthand': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
      'no-useless-rename': 'error',
      'no-duplicate-imports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'IfStatement > CallExpression.test',
          message:
            'Do not call expressions directly in if statements. Assign the result to a variable first.',
        },
        {
          selector: 'IfStatement > LogicalExpression.test',
          message:
            'Do not use logical expressions directly in if statements. Assign to a variable first.',
        },
        {
          selector: 'IfStatement > UnaryExpression.test',
          message:
            'Avoid negating expressions directly in if statements. Assign to a variable first.',
        },
        {
          selector: 'ReturnStatement > CallExpression',
          message:
            'Do not return expressions directly. Assign them to a variable first.',
        },
        {
          selector: 'UnaryExpression[operator="!"]',
          message: 'Avoid using negation (!condition).',
        },
      ],

      // turn off some rules from pluginJs.configs.all
      'no-alert': 'off',
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
      'no-unsafe-type-assertion': 'off',

      // https://typescript-eslint.io/rules/
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // turn off some rules from tseslint.configs.all
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowAny: false,
          allowNullableBoolean: false,
          allowNullableEnum: false,
          allowNullableNumber: false,
          allowNullableObject: false,
          allowNullableString: true,
          allowNumber: true,
          allowString: true,
        },
      ],
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off', // check it later, it may make sense
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/consistent-return': 'off',
      '@typescript-eslint/indent': 'off', // bad for performance
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

      // https://github.com/jsx-eslint/eslint-plugin-react
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
  },
]
