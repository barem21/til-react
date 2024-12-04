# Axios 활용
- https://axios-http.com/kr/docs/intro
- `npm install axios`

## 1. 기본 사용법
```jsx
import axios from "axios";
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
      const res = await axios.get(API_URL);
      //const data = await res.json();
      //console.log(data);
      setMemberList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMmeber = async _id => {
    try {
      const res = axios.get(`${API_URL}/${_id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //회원 추가
  const postMember = async _item => {
    //console.log(_item);
    try {
      await axios.post(API_URL, _item);
      getMembers(); //회원목록 다시 가져오기
      setFormData(initData);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  //회원 수정
  const putMember = async _item => {
    //console.log(_item);
    try {
      await axios.put(`${API_URL}/${_item.id}`, _item);
      getMembers(); //회원목록 다시 가져오기
      setSelectUser(initData); //초기화
    } catch (error) {
      console.log(error);
    }
  };

  //회원 삭제
  const deleteMember = async _id => {
    try {
      await axios.delete(`${API_URL}/${_id}`);
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
```

## 2. 예외 및 에러 처리
- 우리가 fetch, 또는 axios를 활용해서 request하면 API 백엔드 서버는 response를 합니다.

```jsx
{
  // `data`는 서버가 제공하는 응답입니다.
  data: {},

  // `status`는 HTTP 상태 코드입니다.
  status: 200,

  // `statusText`는 HTTP 상태 메시지입니다.
  statusText: 'OK',

  // `headers`는 HTTP 헤더입니다.
  // 모든 헤더 이름은 소문자이며, 괄호 표기법을 사용하여 접근할 수 있습니다.
  // 예시: `response.headers['content-type']`
  headers: {},

  // `config`는 요청을 위해 `Axios`가 제공하는 구성입니다.
  config: {},

  // `request`는 이번 응답으로 생성된 요청입니다.
  // 이것은 node.js에서 마지막 ClientRequest 인스턴스 입니다.
  // 브라우저에서는 XMLHttpRequest입니다.
  request: {}
}
```

### 2.1. ststus값 참조
- https://developer.mozilla.org/ko/docs/Web/HTTP/Status

```jsx
  const getMembers = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res.status);
      //const data = await res.json();
      //console.log(data);

      //리턴값 첫번째 자리 확인
      const responseStatus = res.status.toString().charAt(0);

      if (responseStatus === "2") {
        //성공
        setMemberList(res.data);
      } else {
        console.log("데이터가 없어요!");
      }
    } catch (error) {
      //리턴값 첫번째 자리 확인(첫자리가 4라면 우리를 의심하자(오타 등))
      const errorStatus = error.response.status.toString().charAt(0);

      if (errorStatus === "5") {
        alert("서버가 꺼졌어요!");
      }
      if (errorStatus === "4") {
        alert("호출이 실패되었습니다!");
      }
      console.log(error);
    }
  };
```

### 2.2. 백엔드 협업시 (예: Axios, fetch) 코딩 컨벤션
- `/src/apis` 폴더 생성 권장
- `/src/apis/config.js` 파일 생성 권장
- `/src/apis/members.js` 기능별 담당 파일 생성
- `/src/apis/todos.js` 기능별 담당 파일 생성
- `/src/apis/diary.js` 기능별 담당 파일 생성

### 2.3. package.json 수정 (proxy 설정)
- 백앤드에서 제공한 ip주소 추가
- `"proxy": "백앤드 측의 ip주소"`

### 2.4. 향후 시간이 지나면서 코드 고도화를 시도합니다.
- 1단계 : API호출과 화면갱신 즉, state 관리를 .jsx에서 작성
- 2단계 : API호출을 별도의 파일로 분리, state 관리도 옮겨보고
- 마지막 단계는 : aPI호출은 js에서 진행, 그 결과를 리턴받아서 jsx에서 활용하도록 시도

```jsx
import axios from "axios";

//api url
export const API_URL = "http://localhost:5000/member";

//axios 인스턴스 생성하기
export const axiosInstance = new axios.create();
```

```jsx
import { API_URL, axiosInstance } from "./config";

//API 매서드
//회원 전체목록
export const getMembers = async () => {
  try {
    const res = await axiosInstance.get(API_URL);
    //console.log(res.status);

    //fetch쓸 경우에는 아래 방식으로
    //const data = await res.json();
    //console.log(data);

    //리턴값 첫번째 자리 확인
    const responseStatus = res.status.toString().charAt(0);

    if (responseStatus === "2") {
      //성공
      return res.data;
    } else {
      console.log("데이터가 없어요!");
      return [];
    }
  } catch (error) {
    //리턴값 첫번째 자리 확인(첫자리가 4라면 우리를 의심하자(오타 등))
    const errorStatus = error.response.status.toString().charAt(0);

    if (errorStatus === "5") {
      alert("서버가 꺼졌어요!");
    }
    if (errorStatus === "4") {
      alert("호출이 실패되었습니다!");
    }
    console.log(error);
    return [];
  }
};

export const getMeber = async _id => {
  try {
    const res = axiosInstance.get(`${API_URL}/${_id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

//회원 삭제
export const deleteMember = async _id => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${_id}`);
    //console.log(res);
    //alert("삭제 완료!");
    //return res.data;
    return "success";
  } catch (error) {
    console.log(error);
    //return error.response.status;
    return "fail";
  }
};
```

```jsx
import { useEffect, useState } from "react";
import { deleteMember, getMembers } from "../apis/member";
import { API_URL, axiosInstance } from "../apis/config";

const Member = () => {
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

  //회원 추가
  const postMember = async _item => {
    //console.log(_item);
    try {
      await axiosInstance.post(API_URL, _item);
      callApiMember(); //회원목록 다시 가져오기
      setFormData(initData);
      setIsEdit(false);
      alert("추가되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  //회원 수정
  const putMember = async _item => {
    //console.log(_item);
    try {
      await axiosInstance.put(`${API_URL}/${_item.id}`, _item);
      callApiMember(); //회원목록 다시 가져오기
      setIsEdit(false);
      alert("수정되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

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
    postMember({ ...formData }, setMemberList);
  };

  //수정 폼 전송
  const handleSubmitEdit = e => {
    e.preventDefault(); //새로고침 방지(form 전송방지)
    putMember({ ...selectUser });
  };

  //호출하면서 호출결과를 useState 업데이트 반영하기
  const callApiMember = async () => {
    const result = await getMembers();
    setMemberList(result);
  };

  const callApiDelete = async _id => {
    const result = await deleteMember(_id);
    if (result === "success") {
      alert("삭제되었습니다.");
      callApiMember(); //회원목록 다시 불러오기
    } else {
      alert("다시 시도하세요.");
    }
  };

  //화면 그려지면 처음 한번 실행
  useEffect(() => {
    callApiMember(); //회원목록 출력
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
                <button type="button" onClick={() => callApiDelete(item.id)}>
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
```