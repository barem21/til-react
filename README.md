# fetch로 REST API 연동해 보기
- `async ... await`로 비동기 처리를 기준

## 1. 사전 조건은 백앤드가 live되어 있어야 합니다.
- 터미널에 prompt 현재 폴더가 `server`여야 함
- `npm run start` 실행

## 2. fetch로 데이터 연동하기
- `jwt(javascript web token)` 인증없이 진행인 경우
- `/src/todos/Todo.jsx` 폴더(todos) 및 파일(Todo.jsx) 생성
- `/src/main.jsx` 임폴트

```jsx
import { useEffect, useState } from "react";

const Todo = () => {
  const initData = {
    title: "",
    content: "",
  };
  // 화면 갱신용 state
  const [todoList, setTodoList] = useState([]);
  const [formData, setFormData] = useState(initData);

  // 내용 수정용 state
  const initPutData = {
    id: "",
    title: "",
    content: "",
  };
  const [putData, setPutData] = useState(initPutData);

  // 전체목록
  const getTodos = async () => {
    console.log("서버접속 후 전체 할일 가져옮");
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos`);
      const data = await res.json();
      //새로 리랜더링하라!
      setTodoList(data);
    } catch (error) {
      console.log(`에러입니다 : ${error}`);
      console.log(`잠시 후 다시 시도해주세요.`);
    }
  };
  // 상세내용보기
  const getTodoDetail = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(`네트워크 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  // 할일등록 1개
  const postTodo = async () => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("할일이 등록되었습니다.");
      getTodos();
      setFormData(initData);
    } catch (error) {
      console.log(`네트웍이 불안정합니다. ${error}`);
      console.log(`잠시후 다시 시도해 주세요.`);
    }
  };
  // 할일삭제 1개
  const deleteTodo = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`, {
        method: "DELETE",
      });
      alert("데이터가 성공적으로 삭제되었습니다");
      getTodos();
    } catch (error) {
      console.log(`네트워크 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  // 할일 1개의 내용 수정
  const putTodo = async () => {
    const { id, title, content } = putData;
    try {
      await fetch(`http://192.168.0.66:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      alert("수정되었습니다.");
      // 다시읽기
      getTodos();
    } catch (error) {
      console.log(`서버가 불안정합니다. ${error}`);
      console.log(`잠시 후 시도해주세요`);
    }
  };

  // 이벤트 핸들링
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = e => {
    // 웹브라우저 새로갱신 안되요.
    e.preventDefault();
    if (formData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (formData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    postTodo();
  };
  // 상세보기 핸들링
  const handleClickDetail = _item => {
    setPutData({ ..._item });
  };
  // 수정용 핸들링
  const handleChangePut = e => {
    const { name, value } = e.target;
    setPutData({ ...putData, [name]: value });
  };
  const handleSubmitPut = e => {
    // 아래가 없으면 새로 고침되면서 모든 임시 초기화 된다.
    // 반드시 필요.
    e.preventDefault();
    if (putData.title === "") {
      alert("제목이 필요합니다.");
      return;
    }
    if (putData.content === "") {
      alert("내용이 필요합니다.");
      return;
    }

    putTodo();
  };

  // 컴포넌트 보이면 최초 딱 한번 실행
  useEffect(() => {
    // 처음에 todo 로 이동하면, 할일 목록 전체 가져 옮
    getTodos();

    return () => {};
  }, []);
  return (
    <div>
      <h1>Todo 등록</h1>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label>제목</label>
            <input
              name="title"
              value={formData.title}
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={e => handleChange(e)}
            ></textarea>
          </div>
          <div>
            <button type="submit">등록</button>
          </div>
        </form>
      </div>
      <h2>상세보기</h2>
      <div>
        <form onSubmit={e => handleSubmitPut(e)}>
          <div>
            <label>선택한 제목</label>
            <input
              type="text"
              name="title"
              value={putData.title}
              onChange={e => handleChangePut(e)}
            />
          </div>
          <div>
            <label>선택한 내용</label>
            <textarea
              name="content"
              value={putData.content}
              onChange={e => handleChangePut(e)}
            ></textarea>
          </div>
          <div>
            <button type="submit">수정</button>
          </div>
        </form>
      </div>
      <h2>Todo List</h2>
      <div>
        {todoList.map(item => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              <button
                type="button"
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                삭제
              </button>
              <button type="button" onClick={() => setPutData({ ...item })}>
                수정
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
```

```jsx
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
```