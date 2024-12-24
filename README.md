# useRef

- `리랜더링하여도 값을 보관`한다.
- 화면 출력용은 아니다.
- 용도 : html태그 참조, 변수값 참조

## DOM 요소 접근

```jsx
import { useRef } from "react";

function App() {
  //태그 참조
  const inputRef = useRef(null);

  const handelFocus = () => {
    //current를 통해서 태그 참조
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>useRef을 이용한 포커스 이동</h1>
      <div>
        {/* ref로 연결하기 */}
        <input
          ref={inputRef}
          type="text"
          name="text1"
          placeholder="아이디 입력"
        />
        <button type="button" onClick={() => handelFocus()}>
          입력창으로 이동
        </button>
      </div>
    </div>
  );
}

export default App;
```

## 값 접근 및 저장

- 리랜더링 시에도 값을 보관한다.

```jsx
import { useRef } from "react";

function App() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current++;
    console.log(countRef.current);
  };

  const decrement = () => {
    countRef.current--;
    console.log(countRef.current);
  };

  return (
    <div>
      <h1>useRef를 이용한 값 보관 및 저장</h1>
      <div>리랜더링 안하기 때문에 화면에 출력은 안됨 : {countRef.current}</div>
      <div>console.log 확인해보면 값은 바뀜</div>
      <div>
        <button type="button" onClick={increment}>
          증가
        </button>
        <button type="button" onClick={decrement}>
          감소
        </button>
      </div>
    </div>
  );
}

export default App;
```

## 응용 예제

- 버튼 클릭시 스크롤 위치 이동

```jsx
import { useRef } from "react";

function App() {
  const compRef = useRef(null);
  const topRef = useRef(null);

  const moveCom = () => {
    console.log("회사소개로 이동");
    compRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const moveTop = () => {
    console.log("맨위로 이동");
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={topRef}>
      <h1>useRef를 이용한 스크롤 이동</h1>
      <div>
        <button type="button" onClick={moveCom}>
          회사소개
        </button>
        <button
          type="button"
          onClick={moveTop}
          style={{ position: "fixed", bottom: "20px", right: "30px" }}
        >
          위로
        </button>

        <div style={{ height: "100vh", background: "#eee" }}>인사말</div>
        <div ref={compRef} style={{ height: "100vh", background: "#aaa" }}>
          회사소개
        </div>
      </div>
    </div>
  );
}

export default App;
```

- 입력폼 초기화

```jsx
import { useRef } from "react";

function App() {
  const inputRef = useRef(null);
  const clear = () => {
    //폼값 초기화
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1>useRef를 이용한 값 초기화</h1>
      <div>
        <input ref={inputRef} type="text" name="text1" />
        <button type="button" onClick={clear}>
          값 초기화
        </button>
      </div>
    </div>
  );
}

export default App;
```

- 비디오 제어

```jsx
import { useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const playVideo = () => {
    videoRef.current.play();
  };
  const stopVideo = () => {
    videoRef.current.stop();
  };
  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <div>
      <h1>useRef를 이용한 비디오 제어</h1>
      <div>
        <video ref={videoRef} src="" autoPlay controls muted></video>

        <div>
          <button type="button" onClick={playVideo}>
            play
          </button>
          <button type="button" onClick={stopVideo}>
            stop
          </button>
          <button type="button" onClick={pauseVideo}>
            일시정지
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
```
