import { useEffect, useState } from "react";

const Todo = () => {
  const initData = {
    title: "",
    content: "",
  };

  const initDataPut = {
    id: "",
    title: "",
    conent: "",
  };

  const [formData, setFormData] = useState(initData); //등록
  const [putData, setPutData] = useState(initDataPut); //수정

  //화면 갱신용
  const [todoList, SetTodoList] = useState([]);

  //전체목록
  const getTodos = async () => {
    //4
    console.log("서버접속 후 전체 할일 가져오기");
    try {
      //1
      const res = await fetch(`http://192.168.0.66:5000/todos`); //3
      const data = await res.json();

      //새로 리랜더링하라
      SetTodoList(data);
    } catch (error) {
      //1
      console.log(`에러입니다 : ${error}`); //2
      console.log(`잠시 후 다시 시도해 주세요.`); //2
    }
  };

  //할일 상세보기
  const getTodoDetail = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(`네트워크(0) 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //할일 1개 등록
  const postTodos = async () => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("todo가 등록되었습니다.");
      getTodos(); //성공하면 다시 읽기
      setFormData(initData); //초기화
    } catch (error) {
      console.log(`네트워크가 불안정합니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //할일 1개 삭제
  const deleteTodos = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`, {
        method: "DELETE",
      });
      alert("삭제 처리되었습니다.");
      getTodos(); //내용 다시읽기
    } catch (error) {
      console.log(`네트워크(1) 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //할일 1개의 내용 수정
  const putTodos = async () => {
    try {
      const { id, title, content } = putData;
      await fetch(`http://192.168.0.66:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
    } catch (error) {
      console.log(`서버가 불안정합니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    //새로고침 방지
    e.preventDefault();
    if (formData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (formData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    postTodos();
  };

  //수정용
  const handleClickDetail = _item => {
    setPutData({ ..._item });
    //console.log(_item);
  };
  const handleChangePut = e => {
    const { name, value } = e.target;
    setPutData({ ...formData, [name]: value });
  };
  const handleSubmitPut = e => {
    //새로고침 방지
    e.preventDefault();
    if (putData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (putData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    postTodos();
  };

  //컴포넌트 보이면 최초 딱 한번 실행
  useEffect(() => {
    //console.log("컴포넌트가 보임");

    //처음에 todo로 이동하면 할일 목록 전체 가져오기
    getTodos();

    //하나만 가져오기
    //getTodoDetail("b2a6");
    return () => {};
  }, []);

  return (
    <div>
      <h2>Todo 등록</h2>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label>제목</label>
            <input
              type="text"
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

      <div>
        <h2>Todo 수정</h2>
        <form onSubmit={e => handleSubmitPut(e)}>
          <div>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={putData.title}
              onChange={e => handleChangePut(e)}
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              name="content"
              value={putData.content}
              onChange={e => handleChangePut(e)}
            ></textarea>
          </div>
          <div>
            <button type="submit">등록</button>
          </div>
        </form>
      </div>

      <div>
        <h2>Todo List</h2>
        {todoList.map(item => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              <button
                type="button"
                onClick={() => {
                  deleteTodos(item.id);
                }}
              >
                삭제
              </button>
              <button type="button" onClick={() => handleClickDetail(item)}>
                상세보기
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
