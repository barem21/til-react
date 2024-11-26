# React 변수 알아보기

## 1. JSX 변수 활용

- /src/components/Pop.jsx 생성 : rafce(React Arrow Function Component Export)
- 1. 컴포넌트는 html을 배치한다.
- 2. 컴포넌트는 css를 배치한다.
- 3. 컴포넌트에 js를 활용한다.

### 1.1. JSX의 변수 출력하는 법

- 보간법 : {중괄호 표기법}

```jsx
const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  return (
    <div>
      <h4>{title}</h4>
      <p>{data}</p>
    </div>
  );
};
export default Pop;
```

### 1.2. JSX에 보간법을 이용한 css 출력

#### 1.2.1. 인라인 방식

- {속성명:속성값,속성명:속성값}

```jsx
const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  return (
    <div>
      <h4 style={{ color: "#ff6600", fontSize: "24px" }}>{title}</h4>
      <p>{data}</p>
    </div>
  );
};
export default Pop;
```

#### 1.2.2. 객체 리터럴 오브젝트 방식

```jsx
const Pop = () => {
  const title = "팝업 타이틀";
  const data = "팝업 내용";
  //CSS역할을 하는 객체 리터럴은 변수명을 파스칼로 합니다.(관례)
  const TitleStyle = { color: "#ff6600", fontSize: "24px" };

  return (
    <div>
      <h4 style={TitleStyle}>{title}</h4>
      <div>{data}</div>
    </div>
  );
};

export default Pop;
```

#### 1.2.3. 객체 리터럴 오브젝트는 가능하면 .js파일에서 export 형식 권장

- /src/compontents/pop.js (확장자 조심(.js))

```js
//CSS 역할을 하는 객체 리터럴은 변수명을 파스칼로 합니다.(관례)
export const TitleStyle = { color: "#ff6600", fontSize: "24px" };
export const DataStyle = { color: "#666", fontSize: "14px" };
```

- /src/compontents/Pop.jsx (사용처)

```jsx
import { DataStyle, TitleStyle } from "./pop";

const Pop = () => {
  const title = "팝업 타이틀";
  const data = "팝업 내용";

  return (
    <div>
      <h4 style={TitleStyle}>{title}</h4>
      <div style={DataStyle}>{data}</div>
    </div>
  );
};

export default Pop;
```

## 2. CSS-IN-JS

- Styled Component
- Emotion (현재 유행함)

### 2.1. Emotion 환경 구성

- `vscode-styled-components` 플러그인 설치

```
npm i @emotion/react @emotion/styled
```

### 2.2. 장점

- 태그만 보아도 어떠한 내용을 보여주는지 알수 있다.
- 별도의 컴포넌트 jsx를 만들지 않아도 된다.
- CSS도 함께 작성할 수 있다.

```jsx
import styled from "@emotion/styled";
import { DataStyle, TitleStyle } from "./popup";

const Pop = () => {
  const title = "팝업 타이틀";
  const data = "팝업 내용";

  const PopupTitle = styled.h4`
    color: #ff2200;
    font-size: 24px;
    font-weight: 700;
  `;
  const PopupContents = styled.div`
    font-size: 14px;
  `;
  const SlideDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aaa;
  `;
  const BannerDiv = styled.div``;
  const NoticeDiv = styled.div``;

  return (
    <div>
      <PopupTitle style={TitleStyle}>{title}</PopupTitle>
      <PopupContents style={DataStyle}>{data}</PopupContents>
      <SlideDiv>슬라이드</SlideDiv>
      <BannerDiv>배너</BannerDiv>
      <NoticeDiv>공지사항</NoticeDiv>
    </div>
  );
};

export default Pop;
```

### 2.3. Props 전달 가능

- Emotion 에서 props가 무엇인지 이해 후
- JSX에서도 그대로 이해하면 됨
- 장점은 응용범위가 넓고, 재사용을 할 수 있다.
- JSX 컴포넌트처럼 CSS 컴포넌트이다.
- 일반적으로 별도 js파일로 모아서 팀이 활용한다.

#### 2.3.1. 기본형

```js
const SlideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

<SlideDiv>사용처</SlideDiv>;
```

#### 2.3.2. props형

```js
const SlideDiv = styled.div`
  height: ${props => props.hh}px;
  background-color: ${props => props.bg};
`;
<SlideDiv bg={"#e5e5e5"} hh={50}>
  사용처
</SlideDiv>;
```

#### 2.3.3. props 기본값 적용한 경우 추천합니다.

```js
const SlideDiv = styled.div`
  height: ${props => props.hh || 40}px;
  background-color: ${props => props.bg || "#fff"};
`;
<SlideDiv bg={"#e5e5e5"} hh={50}>
  사용처
</SlideDiv>;
```
