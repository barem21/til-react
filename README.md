# Router 참고 처리 사항
- 현재 모든 jsx 파일을 불러들이는 것은 부하가 크다.
- 동적 로딩

## 1. lazy
- 문법이 잘 모르겠어요. (그동안 보던 것과 달라서 처음 곤란)

```jsx
import AboutPage from "./pages/about/Index";
```

```jsx
import { lazy } from "react";
const LazyAboutPage = lazy(() => import("./pages/about/Index"));
```

## 2. Suspense
- `로딩중` 표시하기
- https://www.npmjs.com/package/react-spinners
- https://www.davidhu.io/react-spinners/
- npm i react-spinners

```js
<PacmanLoader color="#f71b64" margin={17} size={51} speedMultiplier={2} />
```

```jsx
import { Suspense } from "react";

<Route
  path="/"
  element={
    <Suspense fallback={<div>로딩중...</div>}>
      <LazyHomePage />
    </Suspense>
  }
></Route>
```

```jsx
import styled from "@emotion/styled";
import { PacmanLoader } from "react-spinners";

const LoadingDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const Loading = () => {
  return (
    <LoadingDiv>
      <PacmanLoader color="#f71b64" margin={17} size={51} speedMultiplier={2} />
    </LoadingDiv>
  );
};

export default Loading;
```

```jsx
<Route
  path="/"
  element={
    <Suspense fallback={<Loading />}>
      <LazyHomePage title={"좋은회사"} year={2024} version={"v1.0"} />
    </Suspense>
  }
></Route>
```
