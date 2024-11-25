# React 컴포넌트 만들기

## 1. 컴포넌트란?

- 웹 페이지의 `각 요소 중` 재활용이 되는 내용을 별도의 `.jsx`로 생성한 것
- 예) Header.jsx, Footer.jsx 등

## 2. `Component`와 `Page`를 구분해 본다.

- 수업 중에 `Page`라고 얘기하면 `Component`들을 모아서 하나의 페이지를 구성한다는 의미
- 추후에 `pages` 폴더를 생성해야 함(`폴더는 무조건 소문자`, window에서는 대/소문자 구분안함)
- 추후에 `components` 폴더를 생성해야 함

## 3. 컴포넌트의 이해

### 3.1. html을 React에서는 `jsx`라고 호칭함

- js로 html을 생성하는 역할
- 함수명이 대문자로 시작한 파스칼 케이스
- jsx를 출력하는 함수는 파스칼 케이스를 사용해야 한다는 규칙이 있음
- jsx를 출력하는 함수는 반드시 `return()` 구문이 있어야 한다는 규칙이 있음
- `return()` 안쪽에 html을 작성한다.
- jsx는 `html 태그 형식`으로 호출한다.
- jsx는 반드시 `root 태그`가 존재해야 한다.
- 용도가 묶음을 만드는 것 외에 없는 root라면 `<></>` Fragment로 묶어준다.
- main.jsx

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexPage from "./pages/IndexPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IndexPage></IndexPage>
  </StrictMode>,
);
```

### 3.2. 각 `화면의 기능`에 따라서 파일을 분리한다.

- `협업`을 진행해야 하므로 각 기능별 단위마다 별도의 컴포넌트 관리 필요
- `/src/pages/` 폴더에는 URL 주소에 맞는 페이지 배치
- `/src/components/` 폴더에는 각각의 페이지에 배치될 html 요소들 배치

- /src/pages/IndexPage.jsx

```jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

function IndexPage() {
  return (
    <>
      <Header></Header>
      <main>
        <div>공지사항/갤러리</div>
        <div>배너</div>
        <div>바로가기</div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default IndexPage;
```

- /src/components/Header.jsx

```jsx
const Header = () => {
  return (
    <header>
      <a href="#">로고</a>
      <div>
        <ul>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
```

- /src/components/Footer.jsx

```jsx
const Footer = () => {
  return (
    <footer>
      <a href="#">로고</a>
      <div>카피라이트</div>
      <div>SNS link</div>
    </footer>
  );
};

export default Footer;
```

- /src/pages/IndexPage.jsx

```jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

function IndexPage() {
  return (
    <>
      <Header></Header>
      <main>
        <div>공지사항/갤러리</div>
        <div>배너</div>
        <div>바로가기</div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default IndexPage;
```

- /src/pages/CeoPage.jsx

```jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

function CeoPage() {
  return (
    <>
      <Header></Header>
      <main>대표 인사말</main>
      <Footer></Footer>
    </>
  );
}

export default CeoPage;
```
