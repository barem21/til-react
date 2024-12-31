import { createContext } from "react";

//데이터용 context
export const TodoStateContext = createContext(null);

//데이터 업데이트용 dispatch context
export const TodoDispatchContext = createContext(null);
