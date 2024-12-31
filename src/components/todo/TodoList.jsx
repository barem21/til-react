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
