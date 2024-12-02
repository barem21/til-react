import { useState } from "react";

const Sample0 = () => {
  // 할일 목록
  const [todoList, setTodoList] = useState([]);

  // 지금입력중인 할일
  const [todo, setTodo] = useState("");

  const clickAdd = () => {
    // 목록을 만들어서 업데이트
    setTodoList([...todoList, todo]);
    setTodo("");
  };

  return (
    <div>
      <h1>입력내용 : {todo}</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
      </div>

      <div>
        <button onClick={clickAdd}>할일추가</button>
        {todoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default Sample0;
