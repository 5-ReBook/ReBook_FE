module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb', // Airbnb 스타일 가이드 적용
    'plugin:react/recommended', // 리액트 관련 규칙 적용
    'plugin:jsx-a11y/recommended', // 접근성 관련 규칙 적용
    'plugin:import/errors', // import 관련 오류 규칙 적용
    'plugin:import/warnings', // import 관련 경고 규칙 적용
    'prettier', // Prettier와 충돌하는 규칙 비활성화
  ],
  plugins: ['react', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaVersion: 2021, // 또는 최신 버전 (2023 등으로 설정 가능)
    sourceType: 'module', // ES6 모듈 사용 가능
    ecmaFeatures: {
      jsx: true, // JSX 지원
    },
  },
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙을 ESLint 규칙으로 사용
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }], // JSX를 사용하는 파일 확장자를 .jsx와 .js로 설정
    'react/react-in-jsx-scope': 'off', // 리액트 17+에서는 React import가 필요 없으므로 끔
    'import/prefer-default-export': 'off', // named export를 선호
    'react/prop-types': 'off', // prop-types 사용을 강제하지 않음
    'react/jsx-props-no-spreading': 'off', // JSX에서 props spreading 허용
  },
};
