import { useState } from "react";

export function useCount(initvalue = 0) {
  const [count, setCount] = useState(initvalue);
  const add = () => {
    setCount(count + 10);
  };
  const minus = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(initvalue);
  };

  return { count, add, minus, reset };
}
