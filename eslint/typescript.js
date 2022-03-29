module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:import/typescript'],
      rules: {
        // function definition은 hoisting되기 때문에 define 되기 전에 사용해도 됩니다.
        // React component 등에서, 메인(default export) 컴포넌트를 위에 정의하고 private 컴포넌트를 밑에 정의하는 패턴에서 유용합니다.
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
          },
        ],

        // Type 만 사용하는 경우 import 문에 type을 명시적으로 붙여줍니다. (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)
        '@typescript-eslint/consistent-type-imports': 'error',

        // 함수의 return type은 명시적으로 적는 대신 타입 추론을 이용합니다. (tsconfig에서 compilerOptions.noImplicitAny 사용을 권장합니다.)
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Promise 는 async/await 또는 then/catch 로 처리되야 합니다. 단 void 연산자를 사용할 경우 무시됩니다.
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            ignoreVoid: true,
          },
        ],

        // void 연산자를 사용하지 않습니다. 단, 변수 할당이 아닌 구문으로는 사용할 수 있습니다. floating promise에 void를 붙이기 위해 사용합니다.
        'no-void': [
          'error',
          {
            allowAsStatement: true,
          },
        ],

        // typescript Enum 을 사용할 때 eslint에서는 에러가 나는 걸 방지합니다. (https://github.com/typescript-eslint/typescript-eslint/issues/2483)
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        // type이 잘못 추론됐을 때 쉽게 개발할 수 있도록 no-null-assertion(!)을 허용합니다.
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/camelcase': 'off',
        camelcase: 'off',
      },
    },
  ],
};
