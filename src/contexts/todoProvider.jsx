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
