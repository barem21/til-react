import { useState } from "react";

const Sample1 = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const checkForm = e => {
    console.log(e.target);
    /*
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("로그인 중 입니다.");
    */
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="user_name"
          placeholder="이름"
          value={formData.user_name}
          onChange={e => checkForm(e)}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="이메일"
          value={formData.user_email}
          onChange={e => checkForm(e)}
        />
        <br />
        <input
          type="password"
          name="pass"
          placeholder="비밀번호"
          value={formData.user_pass}
          onChange={e => checkForm(e)}
        />
        <br />
        <button type="button" onClick={checkForm}>
          로그인
        </button>
      </form>
      <div>
        <div style={{ color: "#ff3300" }}>Error : {errorMsg}</div>
      </div>
      <div>
        <div>이름 : {formData.user_name}</div>
        <div>이메일 : {formData.user_email}</div>
        <div>비밀번호 : {formData.user_pass}</div>
      </div>
    </div>
  );
};
export default Sample1;
