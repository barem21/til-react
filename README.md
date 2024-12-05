# 리소스 최적화

## 1. 이미지 파일
- /public은 원본을 유지한다.
- /src는 압축한다. (웹브라우저도 보관하고 있다.)
- 용도에 맞게 판단하자.
- 그냥 `/src`에 보관하고 사용하자.

## 2. font 파일
- font는 가능하면 웹폰트 URL을 사용하자.
- 구글 폰트, 또는 눈누에 웹폰트 URL이 없는 경우 직접 파일 설정
- 파일인 경우 public 폴더에 넣어두고 활용하자.
- /src/assets에 두면 설정할 것이 많다.
- https://fonts.google.com/
- https://noonnu.cc/font_page/pick

### 2.1. public 폴더에 파일 배치
- /src/index.css : 모든 곳에 기본 적용

```css
@font-face{
  font-family: "asdf";
  src:url("/chab.ttf");
}
@font-face{
  font-family:"qwer";
  src:url("/ddag.ttf");
}
html,
body {
  font-size: var(--font-size-base);
  color: var(--primary-color);
  font-family: "qwer","asdf",sans-serif;
}
```

# 빌드하기