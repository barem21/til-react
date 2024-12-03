import styled from "@emotion/styled";
import moment from "moment";
import { useEffect, useState } from "react";

const Diaries = styled.div`
  max-width: 800px;
  margin: 0 auto;
  h2 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  div {
    margin: 5px 0px;
  }
  label {
    display: inline-block;
    margin-right: 20px;
    vertical-align: 3px;
  }
  input {
    height: 30px;
    padding-left: 5px;
    border: 1px solid #ccc;
  }
  input[type="radio"] {
    width: 20px;
    height: 20px;
  }
  textarea {
    width: calc(100% - 100px);
    height: 50px;
    padding: 5px;
    box-sizing: border-box;
  }
  .btnGroup {
    margin: 20px 0px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    text-align: center;
  }
  .btnGroup button {
    margin: 0px 3px;
    padding: 5px 10px;
  }
  .diaryList button {
    width: 90%;
    height: 30px;
    margin: 2px 0px;
    border: 1px solid #eee;
    background: #fff;
  }
  table {
    width: 100%;
    margin-bottom: 40px;
    border: 1px solid #ddd;
  }
  table th {
    padding: 10px 0px;
    background-color: #eee;
  }
  table td {
    padding: 10px 0px;
    border-top: 1px solid #ddd;
  }
`;

//서버 URL
const API_URL = "http://localhost:5000/diaries";

const Diary = () => {
  //등록 초기화 데이터
  const initData = {
    title: "",
    date: moment().format("YYYY-MM-DD"),
    content: "",
    mood: "",
    weather: "",
  };

  //수정 초기화 데이터
  const initDataPut = {
    title: "",
    date: moment().format("YYYY-MM-DD"),
    content: "",
    mood: "",
    weather: "",
  };

  //화면 갱신용
  const [formData, setFormData] = useState(initData); //등록
  const [putData, setPutData] = useState(initDataPut); //수정
  const [writeTypeData, setWriteTypeData] = useState("write"); //수정하기 보이기 여부(기본 숨김)
  const [diaryList, SetDiaryList] = useState([]); //다이어리 목록(배열)

  //다이어리 전체목록
  const getDiary = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      //console.log(data);
      SetDiaryList(data); //리랜더링
    } catch (error) {
      console.log(`네트워크 에러입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //다이어리 등록하기
  const postDiary = () => {
    try {
      fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("다이어리가 등록되었습니다.");
      getDiary(); //등록 성공하면 다이어리 전체목록 다시 가져오기
      setFormData(initData); //등록 폼 초기화
    } catch (error) {
      console.log(`네트워크 에러입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //다이어리 수정
  const putDiary = async () => {
    try {
      const { id, title, date, content, mood, weather } = putData;
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, date, content, mood, weather }),
      });
      alert("다이어리가 수정되었습니다.");
      setWriteTypeData("write"); //수정하기 숨기기(글쓰기 보이기)
      getDiary(); //수정 성공하면 다이어리 전체목록 다시 가져오기
      setPutData(initDataPut); //수정 폼 초기화
    } catch (error) {
      console.log(`네트워크 에러입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //다이어리 삭제
  const deleteDiary = _id => {
    try {
      fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      alert("삭제 처리되었습니다.");

      getDiary(); //삭제 성공하면 다이어리 전체목록 다시 가져오기
    } catch (error) {
      console.log(`네트워크 에러입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };

  //다이어리 상세내용 가져오기
  const handleClickDetail = _item => {
    console.log(_item);
    setWriteTypeData("modify"); //수정하기 보이기(글쓰기 숨기기)
    setPutData({ ..._item });
  };

  // #### 등록 ############################################################

  //등록 내용 입력되면 화면갱신
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //등록 폼 전송하기
  const handleSubmit = e => {
    e.preventDefault(); //새로고침 방지

    if (formData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (formData.date === "") {
      alert("날짜를 입력하세요.");
      return;
    }
    if (formData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    if (formData.mood === "") {
      alert("기분을 선택하세요.");
      return;
    }
    if (formData.weather === "") {
      alert("날씨를 선택하세요.");
      return;
    }

    postDiary(); //다이어리 등록 실행
  };

  // #### 수정 ############################################################

  //수정 내용 입력되면 화면갱신
  const handleChangePut = e => {
    const { name, value } = e.target;
    setPutData({ ...putData, [name]: value });
  };

  //수정 폼 전송하기
  const handleSubmitPut = e => {
    e.preventDefault(); //새로고침 방지

    if (putData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (putData.date === "") {
      alert("날짜를 입력하세요.");
      return;
    }
    if (putData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    if (putData.mood === "") {
      alert("기분을 선택하세요.");
      return;
    }
    if (putData.weather === "") {
      alert("날씨를 선택하세요.");
      return;
    }

    putDiary(); //다이어리 수정 실행
  };

  //글쓰기로 돌아가기
  const writeForm = () => {
    setWriteTypeData("write"); //글쓰기 보이기
  };

  //컴포넌트 보이면 최초 한번만 실행
  useEffect(() => {
    getDiary(); //다이어리 전체목록 가져오기

    return () => {};
  }, []);
  return (
    <Diaries>
      {writeTypeData === "write" ? ( //글쓰기 타입이 신규등록일 때
        <div>
          <h2>다이어리 등록</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={e => handleChange(e)}
              />
            </div>
            <div>
              <label htmlFor="date">날짜</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={e => handleChange(e)}
              />
            </div>
            <div>
              <label htmlFor="content">내용</label>
              <textarea
                name="content"
                id="content"
                value={formData.content}
                onChange={e => handleChange(e)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="mood0">기분</label>

              <input
                type="radio"
                name="mood"
                id="mood0"
                value="0"
                onChange={e => handleChange(e)}
                checked={formData.mood === "0"}
              />
              <label htmlFor="mood0">😁즐거움</label>
              <input
                type="radio"
                name="mood"
                id="mood1"
                value="1"
                onChange={e => handleChange(e)}
                checked={formData.mood === "1"}
              />
              <label htmlFor="mood1">😍기쁨</label>
              <input
                type="radio"
                name="mood"
                id="mood2"
                value="2"
                onChange={e => handleChange(e)}
                checked={formData.mood === "2"}
              />
              <label htmlFor="mood2">😊평범</label>
              <input
                type="radio"
                name="mood"
                id="mood3"
                value="3"
                onChange={e => handleChange(e)}
                checked={formData.mood === "3"}
              />
              <label htmlFor="mood3">😒화남</label>
              <input
                type="radio"
                name="mood"
                id="mood4"
                value="4"
                onChange={e => handleChange(e)}
                checked={formData.mood === "4"}
              />
              <label htmlFor="mood4">😢슬픔</label>
            </div>
            <div>
              <label htmlFor="weather0">날씨</label>
              <input
                type="radio"
                name="weather"
                id="weather0"
                value="0"
                onChange={e => handleChange(e)}
                checked={formData.weather === "0"}
              />
              <label htmlFor="weather0">🌞맑음</label>
              <input
                type="radio"
                name="weather"
                id="weather1"
                value="1"
                onChange={e => handleChange(e)}
                checked={formData.weather === "1"}
              />
              <label htmlFor="weather1">☁흐림</label>
              <input
                type="radio"
                name="weather"
                id="weather2"
                value="2"
                onChange={e => handleChange(e)}
                checked={formData.weather === "2"}
              />
              <label htmlFor="weather2">🌧비</label>
              <input
                type="radio"
                name="weather"
                id="weather3"
                value="3"
                onChange={e => handleChange(e)}
                checked={formData.weather === "3"}
              />
              <label htmlFor="weather3">❄눈</label>
            </div>

            <div className="btnGroup">
              <button
                type="button"
                onClick={() => {
                  setFormData(initData);
                }}
              >
                초기화
              </button>
              <button type="submit">등록하기</button>
            </div>
          </form>
        </div>
      ) : (
        //수정하기
        <div>
          <h2>다이어리 수정</h2>
          <form onSubmit={e => handleSubmitPut(e)}>
            <div>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                name="title"
                id="title"
                value={putData.title}
                onChange={e => handleChangePut(e)}
              />
            </div>
            <div>
              <label htmlFor="date">날짜</label>
              <input
                type="date"
                name="date"
                id="date"
                value={putData.date}
                onChange={e => handleChangePut(e)}
              />
            </div>
            <div>
              <label htmlFor="content">내용</label>
              <textarea
                name="content"
                id="content"
                value={putData.content}
                onChange={e => handleChangePut(e)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="mood0">기분</label>

              <input
                type="radio"
                name="mood"
                id="mood0"
                value="0"
                onChange={e => handleChangePut(e)}
                checked={putData.mood === "0"}
              />
              <label htmlFor="mood0">😁즐거움</label>
              <input
                type="radio"
                name="mood"
                id="mood1"
                value="1"
                onChange={e => handleChangePut(e)}
                checked={putData.mood === "1"}
              />
              <label htmlFor="mood1">😍기쁨</label>
              <input
                type="radio"
                name="mood"
                id="mood2"
                value="2"
                onChange={e => handleChangePut(e)}
                checked={putData.mood === "2"}
              />
              <label htmlFor="mood2">😊평범</label>
              <input
                type="radio"
                name="mood"
                id="mood3"
                value="3"
                onChange={e => handleChangePut(e)}
                checked={putData.mood === "3"}
              />
              <label htmlFor="mood3">😒화남</label>
              <input
                type="radio"
                name="mood"
                id="mood4"
                value="4"
                onChange={e => handleChangePut(e)}
                checked={putData.mood === "4"}
              />
              <label htmlFor="mood4">😢슬픔</label>
            </div>
            <div>
              <label htmlFor="weather0">날씨</label>
              <input
                type="radio"
                name="weather"
                id="weather0"
                value="0"
                onChange={e => handleChangePut(e)}
                checked={putData.weather === "0"}
              />
              <label htmlFor="weather0">🌞맑음</label>
              <input
                type="radio"
                name="weather"
                id="weather1"
                value="1"
                onChange={e => handleChangePut(e)}
                checked={putData.weather === "1"}
              />
              <label htmlFor="weather1">☁흐림</label>
              <input
                type="radio"
                name="weather"
                id="weather2"
                value="2"
                onChange={e => handleChangePut(e)}
                checked={putData.weather === "2"}
              />
              <label htmlFor="weather2">🌧비</label>
              <input
                type="radio"
                name="weather"
                id="weather3"
                value="3"
                onChange={e => handleChangePut(e)}
                checked={putData.weather === "3"}
              />
              <label htmlFor="weather3">❄눈</label>
            </div>

            <div className="btnGroup">
              <button
                type="button"
                onClick={() => {
                  setPutData(initDataPut);
                }}
              >
                초기화
              </button>
              <button type="submit">수정하기</button>
              <button type="button" onClick={() => writeForm()}>
                취소하기
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="diaryList">
        <h2>다이어리 목록</h2>
        <table border="0" cellPadding="0" cellSpacing="0">
          <colgroup>
            <col width="60"></col>
            <col width=""></col>
            <col width="100"></col>
            <col width="50"></col>
            <col width="50"></col>
            <col width="100"></col>
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>제목/내용</th>
              <th>날짜</th>
              <th>기분</th>
              <th>날씨</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {diaryList.map(item => {
              let mood;
              let weather;

              //기분
              switch (item.mood) {
                case "1":
                  mood = "😍";
                  break;
                case "2":
                  mood = "😊";
                  break;
                case "3":
                  mood = "😒";
                  break;
                case "4":
                  mood = "😢";
                  break;
                default:
                  mood = "😁";
              }

              //날씨
              switch (item.weather) {
                case "1":
                  weather = "☁";
                  break;
                case "2":
                  weather = "🌧";
                  break;
                case "3":
                  weather = "❄";
                  break;
                default:
                  weather = "🌞";
              }

              return (
                <tr key={item.id}>
                  <td align="center">{item.id}</td>
                  <td>
                    <h4>{item.title}</h4>
                    {item.content}
                  </td>
                  <td align="center">{item.date}</td>
                  <td align="center">{mood}</td>
                  <td align="center">{weather}</td>
                  <td align="center">
                    <button
                      type="button"
                      onClick={() => handleClickDetail(item)}
                    >
                      상세보기
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteDiary(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Diaries>
  );
};

export default Diary;
