import styled from "@emotion/styled";
import { useState } from "react";

const Sample6 = () => {
  const [bgColor, setBgColor] = useState("#fff");

  const ChangeBgColor = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${bgColor ? bgColor : "#fff"};
  `;

  return (
    <ChangeBgColor>
      <button onClick={() => setBgColor("#000")}>Black</button>
      <button onClick={() => setBgColor("#ff6600")}>Orange</button>
      <button onClick={() => setBgColor("#0000ff")}>Blue</button>
      <button onClick={() => setBgColor("#fff")}>White</button>
    </ChangeBgColor>
  );
};

export default Sample6;
