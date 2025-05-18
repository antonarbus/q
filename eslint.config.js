import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import jsPlugin from '@eslint/js'
import tsPlugin from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'

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

  jsPlugin.configs.all, // file://./node_modules/@eslint/js/src/configs/eslint-all.js
  ...tsPlugin.configs.all, // file://./node_modules/@typescript-eslint/eslint-plugin/dist/configs/flat/all.js
  reactPlugin.configs.flat.all, // file://./node_modules/eslint-plugin-react/lib/rules/index.js
  prettierConfig,
  {
    rules: {
      // adjust JS rules
      'arrow-body-style': 'off', // blocks with explicit return are good
      'capitalized-comments': 'off', // commented code gets capitalized automatically
      'consistent-return': 'off', // arrow function expects no return value
      'id-length': ['error', { exceptions: ['x', 'y'] }],
      'jsx-quotes': ['error', 'prefer-single'],
      'max-lines-per-function': 'off', // not your business
      'max-lines': 'off', // allows function with max 300 lines
      'max-params': 'off', // arrow function has too many parameters (4). Maximum allowed is 3. --> not your business
      'max-statements': 'off', // max 10 statements per function --> do not like it
      'no-alert': 'off', // like alerts more than many popup components
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
      'no-inline-comments': 'off', // inline comments like this one are necessary
      'no-magic-numbers': 'off', // that is crazy
      'no-ternary': 'off', // nested are bad, but normal ternary is ok
      'no-undefined': 'off', // not helpful coz there are other rule which prevents using "undefined" as variable
      'no-unused-vars': 'off', // sometimes we should have unused vars + there is another ts rule about it
      'no-void': 'off', // need void to let TS know that we are not going to await promise
      'no-warning-comments': 'warn', // warns about "todo" in comments
      'one-var': 'off', // wants to do like let a,b, c --> crazy
      'operator-assignment': 'off', // forces to use +=, do not like it
      'sort-imports': 'off', // nice, do do not care
      'sort-keys': 'off', // nice, but often you group keys logically and not sort alphabetically
      complexity: 'off', // max complexity is 20, if else if else (complexity = 3)
      radix: ['error', 'as-needed'], // disallows providing the 10 radix --> parseInt(var, 10) no need to put 10
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
        {
          selector: 'IfStatement[test.type="Identifier"]',
          message: 'Use explicit boolean comparison like `if (x === true)`.',
        },
        {
          selector: 'ConditionalExpression[test.type="Identifier"]',
          message:
            'Use explicit boolean comparison in ternary like `x ? y : z` → `x === true ? y : z`.',
        },
      ],
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

      // adjust TS rules
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowAny: false,
          allowNullableBoolean: false,
          allowNullableEnum: false,
          allowNullableNumber: false,
          allowNullableObject: false,
          allowNullableString: false,
          allowNumber: false,
          allowString: false,
        },
      ],
      '@typescript-eslint/naming-convention': 'off', // that is too crazy
      '@typescript-eslint/prefer-readonly-parameter-types': 'off', // that is too crazy
      '@typescript-eslint/no-unnecessary-type-parameters': 'off', // does not allow to use generic parameter at jsonParseSafe()
      '@typescript-eslint/no-magic-numbers': 'off', // that is too crazy
      '@typescript-eslint/max-params': 'off', // do not like
      '@typescript-eslint/consistent-return': 'off', // ts takes care of it with "noImplicitReturns": true
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off', // forces to omit boolean comparison in if statements // i like to compare explicitly
      '@typescript-eslint/no-unsafe-type-assertion': 'off', //! enable: make type guard functions with predicates instead of assertions

      // adjust React rules,
      'react/react-in-jsx-scope': 'off', // suppress error 'React' must be in scope when using JSX
      'react/display-name': 'off', // function inside forward ref can by anonymous
      'react/jsx-no-literals': 'off', // requires to <div>{'text'}</div>
      'react/jsx-no-bind': 'off', // does not allow arrow functions in prop
      'react/jsx-props-no-spreading': 'off', // prop spreading is needed
      'react/prefer-read-only-props': 'off', // too much work to put readonly everywhere, not sure it is even needed
      'react/forbid-component-props': 'off', // forbids "style" prop
      'react/destructuring-assignment': 'off', // sometimes it is better to use prop.key
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // allows css prop coming from Emotion lib
      'react/jsx-no-leaked-render': 'off', //!  enable: forbids to render like a && b && c && <Comp />
      'react/jsx-max-depth': 'off', //!  enable: may simplify the complexity
      'react/require-default-props': 'off', //!  enable: make sense to use, maybe
      'react/no-multi-comp': 'off', //!  enable: make sense to use, maybe
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
    },
  },
]
