# 커스텀훅(custom hook)

## hook이란?

- hook은 우리나라 말로 `걸다` 또는 `덩달아서 실행한다`는 의미
- hook은 영어로는 `갈고리`라고 하더군요.
- 리액트 컴포넌트의 state와 lifecycle에 따라서 같이 실행되어지는 함수
- useState, useEffect, useRef, useMemo, useCallback ... 등등 200개 정도
- 개발자가 리액트 빌트인 hook처럼 만든 hook을 커스텀훅이라고 합니다.
- 예) useLocation, useNavigation
- 나도 hook을 필요로 한만큼 만들어서 사용할 수 있다.

## hook을 만들 때 유의사항

- 동일한 기능을 만약 여러번 사용한다면 함수를 만들어 볼 생각을 하자.
- 이 함수가 컴포넌트에 사용이 된다면? hook으로 만들어볼 생각을 하자.
- `/src/hooks`라는 폴더에 모아두겠다고 생각해 보자.
- 파일명은 반드시 `use훅명.js`으로 생성해야 리액트에서 kook처럼 사용하게 해준다.

## hook을 사용 시 유의사항

- 리액트 훅이든, 커스텀 훅이든 반드시 `컴포넌트 내부에 배치`되어야 한다.
- 리액트 훅이든, 커스텀 훅이든 `if문, for문 등의 내부에서는 사용할 수 없다.`
- 예외로 컴포넌트가 아닌 곳에도 리액트 훅을 사용할 수 있는 것은 커스텀 훅이다.

## 훅으로 수정 예제

- App.jsx

```jsx
import { useCount } from "./hooks/useCount";

function App() {
  const { count, add, minus, reset } = useCount(100);
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <div>
        <button type="button" onClick={() => add()}>
          +10 증가 버튼
        </button>
        <button type="button" onClick={() => minus()}>
          -1 감소 버튼
        </button>
        <button type="button" onClick={() => reset()}>
          리셋 버튼
        </button>
      </div>
    </div>
  );
}

export default App;
```

- /src/hooks/useCount.js

```jsx
import { useState } from "react";

export function useCount(initvalue = 0) {
  const [count, setCount] = useState(initvalue);
  const add = () => {
    setCount(count + 10);
  };
  const minus = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(initvalue);
  };

  return { count, add, minus, reset };
}
```

## 실제 커스텀 훅 생성 과정

- 동일한 기능의 반복 사용이라면 custom hook을 고민해 보자.
- custom hook을 생성시 많은 고민을 해야 한다.

- /src/hooks/useAxios.js

```js
import { useEffect, useState } from "react";

//일반적으로 FE개발자는 BE와 API통신을 할거다.
//일반적으로 FE개발자는 주소와 자료를 전달하고 결과를 받을 것이다.
//일반적으로 FE개발자는 get, post, put, delete를 사용할 것이다.
//내가 API통신을 편리하게 사용할 수 있는 hook을 만들어서 팀의 API통신 컨벤션을 제공하겠다.

//일반적 사용을 조사
// const { data, error, loading } = useAxios("주소", "자료", "get");
// const { data, error, loading } = useAxios("주소", "자료", "GET");
// const { data, error, loading } = useAxios("주소", { 자료 }, "post");
// const { data, error, loading } = useAxios("주소", null, "put");
// const { data, error, loading } = useAxios("주소", 1, "delete");

export function useAxios(_url, _payload = null, _method) {
  //api회신 결과
  const [data, setData] = useState(null);

  //api회신 오류 결과
  const [error, setError] = useState(null);

  //api호출 진행중
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); //로딩 시작
    const fetchAPI = async () => {
      try {
        let response;
        let method = _method.toUppercase(_method); //대문자로 method 통일함
        switch (method) {
          case "GET": //axios.get("주소?id=1&num=1")
            response = await axios.get(_url, _payload);
            break;
          case "POST": //axios.post("주소",{객체})
            response = await axios.post(_url, _payload);
            break;
          case "PUT": //axios.put("주소",{객체})
            response = await axios.put(_url, _payload);
            break;
          case "DELETE": //axios.post("주소?id=1")
            response = await axios.delete(_url, _payload);
            break;
          default:
            throw new Error(`${_method} 잘못 보내셨네요.`);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchAPI();
    setLoading(false);
  }, [_url, _payload, _method]);
  return { data, error, loading };
}
```

- /src/hooks/useLogin.js

```js
//로그인에 관련된 코드를 모아둔다.
//더불어서 컴포넌트는 아니지만 use훅들을 사용했다.
//일반 함수에서는 use훅들을 사용하지 못한다.
//그러면 custom hook 만들어서 활용한다.

import { useState } from "react";

export const useLogin = () => {
  //로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  //사용자 정보
  const [data, setData] = useState(null);

  //서버 에러
  const [error, setError] = useState(null);

  //서버 연결중
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("api/signIn");
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, isLogin, login };
};
```

- /src/hooks/useComponents.js

```js
import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
const useComponent = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
```
