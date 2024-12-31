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
