import { useReducer } from "react";
import { counterReducer } from "../../modules/counter/counterReducer";
import { counterInitialState } from "../../modules/counter/counterInitialState";
import { add, minus, reset } from "../../modules/counter/counterActions";

function Counter() {
  const [countState, dispatch] = useReducer(
    counterReducer,
    counterInitialState,
  );
  return (
    <div>
      <h1>Counter</h1>
      <div>
        <h2>Counter : {countState.count}</h2>
        <button type="button" onClick={() => dispatch(add())}>
          증가
        </button>
        <button type="button" onClick={() => dispatch(minus())}>
          감소
        </button>
        <button type="button" onClick={() => dispatch(reset())}>
          초기화
        </button>
      </div>
    </div>
  );
}

export default Counter;
