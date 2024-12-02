import styled from "@emotion/styled";
import { useState } from "react";

const Sample4 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const ModalPopup = styled.div`
    position: fixed;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    width: 300px;
    height: 300px;
    background-color: #ddd;
  `;

  return (
    <div>
      <button onClick={openPopup}>보기</button>
      {isOpen && (
        <ModalPopup>
          <div>팝업창 내용</div>
          <button onClick={closePopup}>닫기</button>
        </ModalPopup>
      )}
    </div>
  );
};

export default Sample4;
