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
