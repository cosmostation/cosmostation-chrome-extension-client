module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'import', 'import-name'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // import하는 패키지명을 그대로 camelCase화해서 쓰도록 강제해서 일관성을 높입니다. 단, react와 clsx는 자동 룰 대신 아래 룰을 따르게 합니다.
    'import-name/all-imports-name': [
      'error',
      {
        clsx: 'cx',
      },
    ],

    // 유사한 항목을 그룹으로 묶어서 정렬합니다.
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports
          ['^\\u0000'],
          // Packages. 'react' related packages come first.
          ['^react', '^\\w', '^@'],
          // Aliases imports.
          ['^~'],
          // Relative imports. Put same-folder imports first and parent imports last.
          ['^\\.', '^\\.\\.'],
          // SVG icons
          ['^.+\\.svg$'],
          // json files
          ['^.+\\.json$'],
          // Style imports.
          ['^.+\\.scss$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    // import 문은 문서 상단에 위치합니다.
    'import/first': 'error',

    // import 문 아래에 빈 줄을 삽입합니다.
    'import/newline-after-import': 'error',

    // 중복된 import를 허용하지 않습니다.
    'import/no-duplicates': 'error',

    // import할 때 js/jsx/ts/tsx 파일은 extension을 붙이지 않고, json에는 항상 붙이게 합니다.
    'import/extensions': [
      'error',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          json: 'always',
        },
      },
    ],

    // import 플러그인으로도 ordering을 강제할 수 있지만, order group 지정이 더 간편한 simple-import-sort 플러그인을 대신 사용합니다.
    'import/order': 'off',

    // 한 파일에 하나의 export만 있더라도 여러 개로 늘어날 가능성을 고려하여 default export를 하지 않는 경우가 훨씬 많습니다.
    'import/prefer-default-export': 'off',
  },
};
