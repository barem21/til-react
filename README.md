# useCallback

- useCallback() : 함수를 리랜더링 시 다시 정의하지 말고 보관해둠

## 기본 예제

```jsx
import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  //리랜더링 즉, state가 바뀌면 함수도 다시 만들어짐
  //이를 다시 정의하지 않도록 useCallback 사용
  const add = useCallback(() => {
    //함수의 기능
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <h1>카운팅 : {count}</h1>
      <div>
        <button type="button" onClick={add}>
          증가
        </button>
      </div>
    </div>
  );
}
export default App;
```

## 응용 예제

- `컴포넌트는 props가 전달되면 리랜더링한다.`
- `props가 변화없으면 리랜더링하지 않는다.`

```jsx
import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0); //숫자 state
  const [text, setText] = useState(""); //내용 state
  //리랜더링 즉, state가 바뀌면 함수도 다시 만들어짐
  //이를 다시 정의하지 않도록 useCallback 사용
  //숫자 증가 함수를 메모해 둠
  //만약 count가 변하면 리랜더링됨
  //만약 text가 변하면 리랜더링됨
  //useCallback를 활용하지 않는다면 text, count가 변하면 함수가 다시 만들어짐
  const add = useCallback(() => {
    console.log("함수 다시 만들어짐");
    //함수의 기능
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <Child add={add} />
      <div>카운팅 : {count}</div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}
export default App;

function Child({ add }) {
  console.log("자식 컴포넌트 리랜더링");
  return (
    <div>
      자식 컴포넌트
      <button type="button" onClick={add}>
        증가
      </button>
    </div>
  );
}
```

- 의존성 배열의 이해

```jsx
import { useState, useCallback } from "react";

function App() {
  const [query, setQuery] = useState("");
  // query 가 변경이 된다면 그때 함수를 다시 정의하겠다.
  const handleSearch = useCallback(() => {
    console.log("query를 처리하는 새로운 함수 생성 ", query);
  }, [query]); //의존성 배열

  return (
    <div>
      <h1>state 변경시 함수 재 실행</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
export default App;
```
