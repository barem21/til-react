# useReducer & Context API 활용

- useReducer는 state 업데이트시 복잡한 과정을 처리하기 위해서 활용한다.
- useReducer를 이용해서 Context에 보관한 state를 관리해 보자.
- Context API는 App 서비스 전체에 공용으로 사용하는 state이다.
- RTK를 이해하기 위한 기초이다.

## 폴더 생성

- /src/components 폴더 : Counter.jsx
- /src/contexts 폴더 : counterContext.jsx, counterProvider.js 파일 생성

- counterContext.jsx

```js
import { createContext } from "react";

//Context 생성
export const CounterStateContext = createContext(null);

//Dispatch용 Context생성
export const CounterDispatchContext = createContext(null);
```

- counterProvider.js

```js
import { useReducer } from "react";
import { CounterDispatchContext, CounterStateContext } from "./counterContext";

//1. 기본값
const initialState = { counter: 0 };

//2. 리듀서 함수
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { state: state.count + 1 };
    case "minus":
      return { state: state.count - 1 };
    case "reset":
      return { state: 0 };
    default:
      return state;
  }
}

//Context Provider 생성
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}
```

- App.jsx

```jsx
import Counter from "./components/counter/Counter";
import { CounterProvider } from "./contexts/counterProvider";

//아래 provider에 의해서 state와 dispacth에 접근가능
function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}

export default App;
```

- Counter.jsx

```jsx
import { useContext } from "react";
import {
  CounterDispatchContext,
  CounterStateContext,
} from "../../contexts/counterContext";

function Counter() {
  //app전체의 context state
  const state = useContext(CounterStateContext);

  //app전체의 context dispatch
  const dispatch = useContext(CounterDispatchContext);

  if (!state || !dispatch) {
    return <div>Provider가 설정되지 않았습니다.</div>;
  }

  return (
    <div>
      <h1>Counter</h1>
      <div>
        <h2>Counter : {state.count}</h2>
        <button type="button" onClick={() => dispatch({ type: "add" })}>
          증가
        </button>
        <button type="button" onClick={() => dispatch({ type: "minus" })}>
          감소
        </button>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          초기화
        </button>
      </div>
    </div>
  );
}

export default Counter;
```

## todo 테스트 폴더 생성

- /src/components/todo 폴더 생성 : TodoList.jsx, TodoAdd.jsx, TodoItem.jsx 파일 생성
- /src/contexts 생성 : todoContext.js, todoProvider.jsx 파일 생성

- App.jsx

```jsx
import TodoAdd from "./components/todo/TodoAdd";
import TodoList from "./components/todo/TodoList";
import { TodoProvider } from "./contexts/todoProvider";

//아래 provider에 의해서 state와 dispacth에 접근가능
function App() {
  return (
    <TodoProvider>
      <TodoAdd />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
```

- todoContext.js

```js
import { createContext } from "react";

//데이터용 context
export const TodoStateContext = createContext(null);

//데이터 업데이트용 dispatch context
export const TodoDispacthContext = createContext(null);
```

- todoProvider.jsx

```jsx
import { useReducer } from "react";
import { TodoDispatchContext, TodoStateContext } from "./todoContext";

//1. 상태생성
const initialTodoState = [];

//2. reducer 함수
function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "toggle":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item,
      );
    case "delete":
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}

//3. context provider 세팅
export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodoState);
  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
```

- TodoAdd.jsx

```jsx
import { useContext, useState } from "react";
import { TodoDispatchContext } from "../../contexts/todoContext";

const TodoAdd = () => {
  const dispatch = useContext(TodoDispatchContext);
  const [text, setText] = useState("");
  return (
    <div>
      <h1>TodoAdd</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={() => dispatch({ type: "add", payload: text })}>
          추가
        </button>
      </div>
    </div>
  );
};

export default TodoAdd;
```

- TodoList.jsx

```jsx
//context state에 변경된 내용 출력

import { useContext } from "react";
import { TodoStateContext } from "../../contexts/todoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useContext(TodoStateContext);
  return (
    <div>
      <div>
        {todos.map(item => (
          <div key={item.id}>
            <TodoItem todo={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
```

- TodoItem.jsx

```jsx
//dispatch로 delete,toggle

import { useContext } from "react";
import { TodoDispatchContext } from "../../contexts/todoContext";

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoDispatchContext);
  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        onClick={() => dispatch({ type: "toggle", payload: todo.id })}
      >
        {todo.id}
        {todo.text}
      </span>
      <button onClick={() => dispatch({ type: "delete", payload: todo.id })}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
```

# 고민해 보세요.

- 1. Context API를 사용할지 말지 고민
