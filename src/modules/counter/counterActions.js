import { ADD, MINUS, RESET } from "./counterTypes";

//4. action은 상태를 업데이트한 과정
export const add = () => ({ type: ADD });
export const minus = () => ({ type: MINUS });
export const reset = () => ({ type: RESET });
