import { useState } from "react";

const Box = () => {
  console.log("state 만들어짐");
  const [login, setLogin] = useState(0);
  let baby = 1;

  const click = () => {
    const temp = login + 1;
    setLogin(temp);
    baby = baby + 1;
  };
  return (
    <div>
      <button onClick={click}>Click</button>
    </div>
  );
};

export default Box;
