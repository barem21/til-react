import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";

export default [
  // dist 폴더는 검사 제외
  { ignores: ["dist"] },
  {
    // 검사할 파일 확장자
    files: ["**/*.{js,jsx}"],
    // 언어 옵션
    languageOptions: {
      ecmaVersion: "latest", // 최신 ECMAScript 문법 사용
      globals: globals.browser, // 브라우저 환경 글로벌 변수 사용
      parserOptions: {
        ecmaFeatures: { jsx: true }, // JSX 문법 활성화
        sourceType: "module", // ES 모듈 사용
      },
    },
    // React 버전 설정
    settings: { react: { version: "18.3" } },
    // 플러그인 설정
    plugins: {
      react, // React 관련 규칙 플러그인
      "react-hooks": reactHooks, // React Hooks 규칙 플러그인
      "react-refresh": reactRefresh, // React Refresh 규칙 플러그인
      prettier, // Prettier 플러그인
    },
    // 규칙 정의
    rules: {
      ...js.configs.recommended.rules, // 기본 JavaScript 권장 규칙
      ...react.configs.recommended.rules, // React 권장 규칙
      ...react.configs["jsx-runtime"].rules, // JSX Runtime 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙
      "react/jsx-no-target-blank": "off", // target="_blank" 관련 규칙 비활성화
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ], // React Fast Refresh 규칙
      "prettier/prettier": "warn", // Prettier 규칙 (포매팅 오류를 에러로 표시)
    },
  },
];
