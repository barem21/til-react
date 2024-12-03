import { useEffect, useState } from "react";

const Member = () => {
  //api url
  const API_URL = "http://localhost:5000/member";

  //초기값
  const initData = {
    email: "",
    pw: "",
  };
  const selectData = {
    id: "",
    email: "",
    pw: "",
  };

  //member 목록 관리(화면 갱신)
  const [memberList, setMemberList] = useState([]); //회원 목록(배열)
  const [formData, setFormData] = useState(initData); //회원 추가
  const [selectUser, setSelectUser] = useState(selectData); //선택된 회원 관리
  const [isEdit, setIsEdit] = useState(false); //회원 정보수정중이냐 아니냐

  //이벤트 핸들러 함수(회원정보 등록 input에 입력값이 있으면 계속 리랜더링)
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //이벤트 핸들러 함수(회원정보 수정 input에 입력값이 있으면 계속 리랜더링)
  const handleChangeEdit = e => {
    const { name, value } = e.target;
    setSelectUser({ ...selectUser, [name]: value });
  };

  //등록 폼 전송
  const handleSubmit = e => {
    e.preventDefault(); //새로고침 방지(form 전송방지)
    postMember({ ...formData });
  };

  //수정 폼 전송
  const handleSubmitEdit = e => {
    e.preventDefault(); //새로고침 방지(form 전송방지)
    putMember({ ...selectUser });
  };

  //API 매서드
  //회원 전체목록
  const getMembers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      //console.log(data);
      setMemberList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMmeber = () => {};

  //회원 추가
  const postMember = async item => {
    //console.log(item);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      getMembers(); //회원목록 다시 가져오기
      setFormData(initData);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  //회원 수정
  const putMember = async item => {
    //console.log(item);
    try {
      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      getMembers(); //회원목록 다시 가져오기
      setSelectUser(initData); //초기화
    } catch (error) {
      console.log(error);
    }
  };

  //회원 삭제
  const deleteMember = async _id => {
    try {
      await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
      alert("삭제 완료!");
      getMembers(); //목록 다시 가져오기
    } catch (error) {
      console.log(error);
    }
  };

  //화면 그려지면 처음 한번 실행
  useEffect(() => {
    getMembers(); //회원목록 출력
    return () => {};
  }, []);
  return (
    <>
      <div>
        <h2>회원관리</h2>
        <div>
          {memberList.map(item => {
            return (
              <div key={item.id}>
                {item.id} : {item.email}
                <button type="button" onClick={() => deleteMember(item.id)}>
                  삭제
                </button>
                <button
                  type="button"
                  onClick={() => setSelectUser({ ...item })}
                >
                  상세보기
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2>새 회원 추가</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="이메일"
              onChange={e => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="pw"
              value={formData.pw}
              placeholder="비밀번호"
              onChange={e => {
                handleChange(e);
              }}
            />
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>

      <div>
        <h2>상세 회원정보</h2>
        {selectUser?.id !== "" ? (
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              <input
                type="email"
                name="email"
                value={selectUser.email}
                placeholder="이메일"
                onChange={e => {
                  handleChangeEdit(e);
                }}
                readOnly={!isEdit}
                disabled={!isEdit}
              />
            </div>
            <div>
              <input
                type="password"
                name="pw"
                value={selectUser.pw}
                placeholder="비밀번호"
                onChange={e => {
                  handleChangeEdit(e);
                }}
                readOnly={!isEdit}
                disabled={!isEdit}
              />
            </div>
            {isEdit ? (
              <>
                <button type="submit" onClick={e => handleSubmitEdit(e)}>
                  수정하기
                </button>
                <button type="button" onClick={() => setIsEdit(false)}>
                  취소하기
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEdit(true)}>
                정보수정
              </button>
            )}
          </form>
        ) : (
          "선택된 회원이 없습니다."
        )}
      </div>
    </>
  );
};

export default Member;
