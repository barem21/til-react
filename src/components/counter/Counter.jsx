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
