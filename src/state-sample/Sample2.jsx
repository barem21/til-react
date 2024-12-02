import { useState } from "react";

const Sample2 = () => {
  // 장바구니 관리
  const [cart, setCart] = useState([]);
  // 장바구니 담기 기능
  const addCart = str => {
    setCart([...cart, str]);
  };

  //제거하기
  const removeCart = _index => {
    const arr = cart.filter((item, index) => _index !== index);
    setCart(arr);
  };

  return (
    <>
      <div style={{ margin: "0px 0px 20px 0px" }}>
        <h4>상품목록</h4>
        <div>
          <button onClick={() => addCart("사과")}>사과</button>
          <button onClick={() => addCart("딸기")}>딸기</button>
          <button onClick={() => addCart("포도")}>포도</button>
          <button onClick={() => addCart("수박")}>수박</button>
        </div>
      </div>

      <div>
        <h4>장바구니</h4>
        <div>
          {cart.length === 0 ? (
            <p>장바구니가 비어있습니다.</p>
          ) : (
            <ul>
              {cart.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                    <button onClick={() => removeCart(index)}>삭제</button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Sample2;
