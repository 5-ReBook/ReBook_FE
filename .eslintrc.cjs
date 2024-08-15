module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Prettier와 ESLint의 충돌을 방지
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    'prettier', // Prettier 플러그인 추가
  ],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙을 ESLint 규칙으로 사용
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.jsx', '.js'] },
    ], // JSX를 사용하는 파일 확장자를 .jsx와 .js로 설정
    'react/react-in-jsx-scope': 'off', // 리액트 17+에서는 React import가 필요 없으므로 끔
    'import/prefer-default-export': 'off', // named export를 선호
    'no-console': 'warn', // console.log 사용 시 경고를 표시
    'react/prop-types': 'off', // prop-types 사용을 강제하지 않음
    'react/jsx-props-no-spreading': 'off', // JSX에서 props spreading 허용
  },
};