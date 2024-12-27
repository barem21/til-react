import React, { useCallback, useRef, useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

function App() {
  const totalRef = useRef(3); // 1씩 증가하면서 id 관리
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 공부하기", completed: false },
    { id: 2, text: "운동가기", completed: false },
  ]);

  // todo 관리 함수를 리랜더링시 재생성 하지 않도록 적용
  // 1. 의존성 배열을 이용해 볼까?
  // 2. 내부에서 처리해 볼까?
  const addTodo = useCallback(text => {
    const newId = totalRef.current++;
    // setTodos([...todos, { id: newId, text: text, completed: false }]);
    setTodos(prev => [...prev, { id: newId, text: text, completed: false }]);
  }, []);

  // completed 변경
  // 1. 의존성 배열을 이용해 볼까?
  // 2. 내부에서 처리해 볼까?
  const toggleTodo = useCallback(id => {
    // const arr = todos.map(item =>
    //   item.id === id ? { ...item, completed: !item.completed } : item,
    // );
    // setTodos(arr);
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }, []);
  const deleteTodo = useCallback(id => {
    const arr = todos.filter(item => item.id !== id);
    setTodos(arr);
  }, []);

  return (
    <div>
      <h1>Todo Service </h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
export default App;

const TodoList = React.memo(function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}) {
  console.log("TodoList 리랜더링");
  return (
    <div>
      <h3>할일 전체 목록 </h3>
      {todos.map(item => {
        return (
          <TodoItem
            key={item.id}
            todo={item}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
});
