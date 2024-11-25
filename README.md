# React 컴포넌트 만들기

- html, 즉 jsx 작성하기

## 1. 컴포넌트에 css 추가하기

- css 폴더에 css 파일들을 모아서 사용하는 경우가 많음
- 개인적 추천
  : 파일이 있는 곳에 css도 같이 두기를 권장함
  : `css 규칙은 권장하기로 컴포넌트명과 동일한 .css 권장`

## 2. css 추가 및 적용하는 법

### 2.1. css 라이브러리 활용

- `index.html`에 `link` 권장
- `reset.css` : 나중에 `npm install` 활용, https://meyerweb.com/eric/tools/css/reset/
- `nomalize.css` : 나중에 `npm install` 활용, https://necolas.github.io/normalize.css/8.0.1/normalize.css
- `폰트 어썸` : 딩벳 폰트-나중에 `npm install` 활용, https://cdnjs.com/libraries/font-awesome, https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css
- `구글 웹폰트` : 나중에 'index.css에 작성' 가능, https://fonts.google.com
- `index.html`

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite React 학습</title>
    <link
      rel="stylesheet"
      href="https://meyerweb.com/eric/tools/css/reset/reset.css"
    />
    <!-- normalize -->
    <link
      rel="stylesheet"
      href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 2.1. 전체 css에 `공통 적용`이 필요한 경우

- `/scr/index.css`를 활용하길 권장

```css
:root {
  --primary-color: #000000;
  --secondary-color: #0000ff;
  --font-size-base: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #000000;
}
ul,
li {
  list-style: none;
}
html,
body {
  font-size: var(--font-size-base);
  color: var(--primary-color);
}
/* 웹서비스 개발시 권장함.(개인적으로) */
html,
body,
:root {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
```

### 2.2. module.css 방식

- 컴포넌트라면 분명 `협업을 할 것`이라는 가정함
- 협업시 css의 우선권 문제가 발생하여 원활한 css가 어려움(class 겹침)
- 최소 `컴포넌트명.module.css`를 준수하기를 권장
- `/src/components/Footer.jsx`

```jsx
import footer from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={footer.layout}>
        <a href="#">로고</a>
        <div>카피라이트</div>
        <div>SNS link</div>
      </div>
    </footer>
  );
};

export default Footer;
```

- `/src/components/footer.module.css`

```css
.layout {
  background: #666;
}
.layout a {
  color: #fff;
}
```

### 2.3. SCSS 방식

- 소스 관리가 편함
- css를 체계적으로 구성
- css에 프로그래밍적 요소로 작성 가능(변수, mixin함수 ...)

#### 2.3.1. 환경구성

- `npm i -D sass`
- `Live Sass Compiler` 플러그인 설치

#### 2.3.2. 기본 문법의 이해

- `/src/scss/` 폴더 생성 권장
- `/src/scss/test.scss` 파일 생성시 확장자 확인 필요

#### 2.3.3. 중첩 문법(Nesting)

```scss
.wrap {
  position: relative;
  .notice {
    width: 33.3%;
    ul {
      li {
        background-color: #999;
      }
    }
  }
  .slide {
    width: 33.4%;
  }
  .banner {
    width: 33.3%;
  }
}
```

#### 2.3.4. 변수

```scss
$width-screen: 1280px;
$notice-width: 33.3%;
$slide-width: 33.4%;
$banner-width: 33.3%;

.wrap {
  position: relative;
  width: $width-screen;
  .notice {
    width: $notice-width;
    ul {
      li {
        background-color: #999;
      }
    }
  }
  .slide {
    width: $slide-width;
  }
  .banner {
    width: $banner-width;
  }
}
```

#### 2.3.5. 변수는 별도의 파일로 관리하자.

- \_로 파일명을 시작하면 .css가 생성되지 않는다.
- \_value.scss로 테스트 파일 생성

```scss
$width-screen: 1280px;
$notice-width: 33.3%;
$slide-width: 33.4%;
$banner-width: 33.3%;
$width-bg: #555;
```

- 변수 사용시 @import "파일명"을 사용함

```scss
@import "value"; //_는 제외하고 파일명만 기록

.wrap {
  position: relative;
  width: $width-screen;
  .notice {
    width: $notice-width;
    ul {
      li {
        background-color: $width-bg;
      }
    }
  }
  .slide {
    width: $slide-width;
  }
  .banner {
    width: $banner-width;
  }
}
```

#### 2.3.6. mixins 사용하기(변수)

- 파일명을 `_`를 활용(css가 생성되지 않도록)
- \_mixins.scss로 테스트 파일 생성

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin border-fn($size, $color) {
  border: $size solid $color;
}
```

- 변수 사용시 @import "파일명"을 사용함
- \_test.scss로 테스트 파일 생성

```scss
@import "value"; //_제외 파일명
@import "mixins"; //_제외 파일명

.wrap {
  @include flex-center;
  @include border-fn(1px, #222);
  position: relative;
  width: $width-screen;
  .notice {
    width: $notice-width;
    ul {
      li {
        background-color: $width-bg;
      }
    }
  }
  .slide {
    width: $slide-width;
  }
  .banner {
    width: $banner-width;
  }
}
```
