# React JSX 문법

## 1. 컴포넌트 Props

- 컴포넌트에 `property=값`으로 작성하면

```jsx
<Box idx={1} stat={false} val={"홍길동"}></Box>
```

- 컴포넌트 내부로 `{}객체 리터럴`로 전달된다.

```jsx
function Box(props) {
  console.log("box", props);
  return <div>Box</div>;
}

export default Box;
```

- 만약 컴포넌트 내부에 작성된 내용(`내용물`)이 있다.
- 아래는 `내용물`을 React에서 `이름이 지정(children이라는 프로퍼티명)`되어 있다.

```jsx
<Box idx={1} stat={false} val={"홍길동"}>
  내용물
</Box>
```

- `props`를 이렇게는 가급적 사용하지 맙시다.

```jsx
console.log("box", props.idx);
console.log("box", props["stat"]);
```

- `props`는 `객체 구조 분해 할당`해서 사용합시다.

```jsx
function Box({ idx, stat, val, children }) {
  return (
    <div>
      <p>
        idx : {idx}, stat : {stat}, val : {val}
      </p>
      children : {children}
    </div>
  );
}
export default Box;
```

## 2. 컴포넌트 조건

### 2.1. falsy한 값은 jsx에 출력되지 않는다.

- `null, false, undefined, 0, ""`
- if 문은 jsx 내부에서 사용할 수 없다.

### 2.2. `jsx에 직접 코딩` 가능한 문법

#### 2.2.1 3항연산자를 많이 사용한다.

- `조건?참값 리턴:거짓값 리턴`
- `로그인 : {islogin?"접속중":"접속종료"}`

#### 2.2.2. 논리 연산자

- `조건 && 결과`
  : 조건이 `참`이면 `뒷내용(결과)` 출력
  : 조건이 `거짓`이면 '' 출력
  : `나이 : {age < 18 && "미성년자"}`

- `조건 || 결과`
  : 조건이 `참`이면 `앞내용` 출력
  : 조건이 `거짓`이면 `뒷내용` 출력
  : `인사 : {hi !== "hello" || "인사 좀 해요!"}`

#### 2.2.3. 옵셔널 체이닝

- 정말 중요해요! (React 에러를 처리하므로)
- `객체?.속성명` (예: info?.nickname)

### 2.3. `js로 결과를 만든 후` jsx에 출력하기

- 예제 코드

```jsx
  const info = {
    nick: "홍길동",
    level: 99,
    gold: 10000,
  };

  <StrictMode>
    <Box
      idx={1}
      age={10}
      islogin={true}
      info={info}
      status={"208"}
      fetch={"pending"}
    >
      내용
    </Box>
```

#### 2.3.1. if

```jsx
function Box({ status }) {
  let message;
  let nowStatus = status.charAt(0); //첫자리 확인
  if (nowStatus === "2") {
    message = "접근성공";
  } else if (nowStatus === "4") {
    message = "Not Found Page";
  } else if (nowStatus === "5") {
    message = "Server Error";
  } else {
    message = "Unknown message";
  }
}

//결과보기
return <div>message : {message}</div>;
```

#### 2.3.2. swich

```jsx
function Box({ fetch }) {
  let response;
  switch (fetch) {
    case "pending":
      response = <span>연결중</span>;
      break;
    case "fresh":
      response = <span>새로운 데이터</span>;
      break;
    default:
      response = <span>대기중</span>;
      break;
  }
}

//결과보기
return <div>response : {response}</div>;
```

## 3. 컴포넌트 반복

### 3.1. 반복해서 JSX에 출력한다면 `map`을 사용하자.

```jsx
const ticket = [
  {
    id: 1,
    cate: "스포츠",
    prName: "프로야구",
    imgUrl:
      "https://media.interparkcdn.net/interpark-tour/image/upload/w_640,h_410,c_limit/v1726726875/domstay/8d7a8d6dd7f84c22.jpg",
  },
  {
    id: 2,
    cate: "연극",
    prName: "레미제라블",
    imgUrl:
      "https://media.interparkcdn.net/interpark-tour/image/upload/w_640,h_410,c_limit/v1726726875/domstay/8d7a8d6dd7f84c22.jpg",
  },
];

const tour = [];

const goods = [
  {
    id: 1,
    cate: "과일",
    prName: "청송 꿀사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 2,
    cate: "채소",
    prName: "제주특별자치도 당근",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 3,
    cate: "과일",
    prName: "고령 딸기",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 4,
    cate: "채소",
    prName: "양파",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
];

<Box ticket={ticket} tour={tour} product={goods} />;
```

```jsx
const Box = ({ product }) => {
  return (
    <div>
      <h2>결과보기</h2>
      <div>
        {product.map(item => {
          return (
            <div className="loop" key={item?.id}>
              <div>
                <img src={item?.imgUrl} alt="" />
              </div>
              <p>{item?.cate}</p>
              <h4>{item?.prName}</h4>
            </div>
          ); //옵셔널 체이닝 사용(?.)
        })}
      </div>
    </div>
  );
};
export default Box;
```

- 추천 : 기능과 화면은 가급적 분리를 하려고 노력하자.

```jsx
const Box = ({ ticket, tour, product }) => {
  const productListGroup = _datas => {
    {
      const result = _datas.map(item => {
        return (
          <div className="loop" key={item?.id}>
            <div>
              <img src={item?.imgUrl} alt="" />
            </div>
            <p>{item?.cate}</p>
            <h4>{item?.prName}</h4>
          </div>
        ); //옵셔널 체이닝 사용(?.)
      });
      return result;
    }
  };

  return (
    <div>
      <h2>결과보기</h2>
      <div>{productListGroup(product)}</div>
      <div>{productListGroup(ticket)}</div>
      <div>{productListGroup(tour)}</div>
    </div>
  );
};

export default Box;
```

### 3.2. 반복문(`foreach`) 고려해 보기

```jsx
const productListGroupEach = datas => {
  const tempArr = [];
  datas.forEach(item => {
    const tag = (
      <div className="loop" key={item?.id}>
        <div className="img">
          <img src={item?.imgUrl} alt="" />
        </div>
        <p>{item?.cate}</p>
        <h4>{item?.prName}</h4>
      </div>
    );
    tempArr.push(tag);
  });
  return tempArr;
};

return (
  <div>
    <h2>결과보기</h2>
    <div>{productListGroupEach(product)}</div>
    <div>{productListGroupEach(ticket)}</div>
    <div>{productListGroupEach(tour)}</div>
  </div>
);
```

## 4. 컴포넌트 state

- 모든 `컴포넌트는 state 속성`을 가지고 있습니다.
- 모든 컴포넌트는 가지고 있는 `state가 바뀌면 화면을 리렌더링` 합니다.
- 모든 컴포넌트는 웹브라우저를 새로고침하기 전까지 `state를 유지` 합니다.

### 4.1. 기준을 세워드립니다.

- React 컴포넌트에서 사용하는 변수는 그냥 `useState()`로 만드세요.
- 컴포넌트를 변수를 변경해서 리랜더링이 필요한 경우에도 `useState()` 를 만드세요.

### 4.2. State 업데이트 시점문제 해결책

```jsx
import { useState } from "react";

const Sample0 = () => {
  console.log("리랜더링");
  // count 를 State 보관하고, count 리랜더링하기
  const [count, setCount] = useState(0);

  // 클릭하면 set 으로 리랜더링하겠다.
  // 연속으로 업데이트는 안됨(비동기라서 함수완료 후 반영)
  const click = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h1>현재점수 : {count}</h1>
      <div>
        <button onClick={click}>점수올리기</button>
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample1 = () => {
  console.log("리랜더링");
  // count 를 State 보관하고, count 리랜더링하기
  const [count, setCount] = useState(0);

  const clickAdd = () => {
    setCount(count + 1);
  };
  const clickMinus = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
  };
  const clickReset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>현재점수 : {count}</h1>
      <div>
        <button onClick={clickAdd}>점수올리기</button>
        <button onClick={clickMinus}>점수내리기</button>
        <button onClick={clickReset}>점수초기화</button>
      </div>
    </div>
  );
};

export default Sample1;
```

```jsx
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
```

```jsx
import { useState } from "react";

const Sample3 = () => {
  const [isDark, setIsDark] = useState(false);
  const ThemeCss = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: isDark ? "#000" : "#fff",
    translation: "0.5s",
  };
  return (
    <div style={ThemeCss}>
      <button onClick={() => setIsDark(!isDark)}>다크모드</button>
    </div>
  );
};

export default Sample3;
```

```jsx
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
```

```jsx
import { useState } from "react";

const Sample5 = () => {
  const [voteCount, setVoteCount] = useState(0);
  const [notVoteCount, setNotVoteCount] = useState(0);

  const vote = () => {
    setVoteCount(voteCount + 1);
  };

  /*
  const notVote = () => {
    setNotVoteCount(notVoteCount + 1);
  };
  */

  return (
    <>
      <div>
        <span>좋아요{voteCount}</span>
      </div>
      <div>
        <span>싫어요{notVoteCount}</span>
      </div>
      <div>
        <button onClick={vote}>좋아요</button>
        <button onClick={() => setNotVoteCount(notVoteCount + 1)}>
          싫어요
        </button>
      </div>
    </>
  );
};

export default Sample5;
```

```jsx
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
```

## 5. 이벤트 처리

- 가장 흔하게 이벤트를 사용하는 곳이 `form` 태그입니다.

### 5.1. 회원가입 폼 만들어 보기

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

const MemberJoinForm = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  fieldset {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ddd;
  }
  h1 {
    margin-bottom: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 5px 0px;
  }
  label {
    width: 120px;
  }
  input {
    height: 30px;
    margin-right: 5px;
    padding-left: 5px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
  input[type="radio"],
  input[type="checkbox"] {
    width: 20px;
  }
  select {
    height: 30px;
    border: 1px solid #ddd;
  }
  textarea {
    width: 80%;
    height: 100px;
    padding: 5px;
    border: 1px solid #ddd;
    resize: vertical;
  }
  button {
    height: 30px;
    margin: 0px 5px;
    padding: 0px 10px;
    border: 1px solid #ddd;
    background-color: #eee;
    cursor: pointer;
  }
`;

const JoinBtn = styled.div`
  text-align: center;
`;

  return (
    <MemberJoinForm>
      <h1>회원가입</h1>
      <form>
        {/* 회원가입 기본정보 입력 */}
        <fieldset>
          <legend>기본정보</legend>
          <ul>
            <li>
              <label htmlFor="userId">아이디</label>
              <input
                type="text"
                name="userid"
                id="userId"
                className="userId"
                placeholder="아이디"
                maxLength="12"
                minLength="4"
              />
              <button type="button">
                중복확인
              </button>
              <input type="hidden" name="useridOk" />
            </li>
            <li>
              <label htmlFor="userPass">비밀번호</label>
              <input
                type="password"
                name="userpass"
                id="userPass"
                placeholder="비밀번호"
                maxLength={15}
              />
            </li>
            <li>
              <label htmlFor="userPassConfirm">비밀번호 확인</label>
              <input
                type="password"
                id="userPassConfirm"
                name="userpassconfirm"
                placeholder="비밀번호 확인"
                maxLength={15}
                minLength={8}
              />
              <p id="msgPassConfirm">
                비밀번호(6자리 이상,숫자,영어,특수문자 포함)를 입력하세요.
              </p>
              <input
                type="hidden"
                name="samecheck"
              />
            </li>
            <li>
              <label htmlFor="userEmail">이메일</label>
              <input
                type="email"
                name="useremail"
                id="userEmail"
                placeholder="이메일"
                maxLength={30}
              />
            </li>
          </ul>
        </fieldset>

        {/* 회원가입 부가정보 입력 */}
        <fieldset>
          <legend>부가정보</legend>
          <ul>
            <li>
              <label htmlFor="userAge">나이</label>
              <input
                type="number"
                name="userage"
                id="userAge"
                placeholder="나이"
                maxLength={5}
              />
              세
            </li>
            <li>
              <label htmlFor="userGenderMan">성별</label>
              <input
                type="radio"
                name="usergender"
                id="userGenderMan"
                value="male"
              />
              <label htmlFor="userGenderMan">남성</label>

              <input
                type="radio"
                name="usergender"
                id="userGenderWomen"
                value="female"
              />
              <label htmlFor="userGenderWomen">여성</label>
            </li>
            <li>
              <label htmlFor="userArea">지역</label>
              <select
                name="userarea"
                id="userArea"
              >
                <option value="">선택하세요.</option>
                <option value="seoul">서울</option>
                <option value="daegu">대구</option>
                <option value="busan">부산</option>
                <option value="jeju">제주</option>
              </select>
            </li>
            <li>
              <label htmlFor="userBirth">생년월일</label>
              <input
                type="date"
                name="userbirth"
                id="userBirth"
                placeholder="나이"
                maxLength="10"
              />
            </li>
            <li>
              <label htmlFor="userIntroduce">자기소개</label>
              <textarea
                name="userintroduce"
                id="userIntroduce"
                placeholder="자기소개 입력"
              ></textarea>
            </li>
            <li>
              <label htmlFor="userProfile">프로필 사진</label>
              <input
                type="file"
                name="userprofile"
                id="userProfile"
                accept="image/png,image/jpeg"
              />
            </li>
            <li>
              <label htmlFor="userFiles">추가 첨부파일</label>
              <input
                type="file"
                name="userfiles"
                id="userFiles"
                multiple
              />
            </li>

            <li>
              <label htmlFor="userHobby1">취미활동</label>
              <input
                type="checkbox"
                name="userhobby"
                id="userHobby1"
                checked
              />
              <label htmlFor="userHobby1">스포츠</label>
            </li>
          </ul>
        </fieldset>

        <JoinBtn>
          <button
            type="button"
          >
            초기화
          </button>
          <button type="submit">회원가입</button>
        </JoinBtn>
      </form>
    </MemberJoinForm>
  );
};

export default EventSample1;
```

### 5.2. 이벤트 만들고 처리하기

- React에서 제공되는 규칙은 `카멜케이스` 입니다.
- React에서 제공되는 규칙은 `on이벤트={하고싶은일}` 입니다.
- `onClick`
- `onChange`
- `onSubmit`
- `onKeyDown`
- `onKeyUp`
- `onMouseEnter`
- `onMouseLeave`

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

const MemberJoinForm = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  fieldset {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ddd;
  }
  h1 {
    margin-bottom: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 5px 0px;
  }
  label {
    width: 120px;
  }
  input {
    height: 30px;
    margin-right: 5px;
    padding-left: 5px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
  input[type="radio"],
  input[type="checkbox"] {
    width: 20px;
  }
  select {
    height: 30px;
    border: 1px solid #ddd;
  }
  textarea {
    width: 80%;
    height: 100px;
    padding: 5px;
    border: 1px solid #ddd;
    resize: vertical;
  }
  button {
    height: 30px;
    margin: 0px 5px;
    padding: 0px 10px;
    border: 1px solid #ddd;
    background-color: #eee;
    cursor: pointer;
  }
`;

const JoinBtn = styled.div`
  text-align: center;
`;

const EventSample1 = () => {
  const initData = {
    useridOk: "0",
    userid: "",
    userpass: "",
    userpassconfirm: "",
    samecheck: "0",
    useremail: "",
    userage: "10",
    usergender: "male",
    userarea: "daegu",
    userbirth: "2000-01-01",
    userintroduce: "",
    userprofile: null,
    userfiles: null,
    userhobby: ["여행"],
  };

  const [formData, setFormData] = useState(initData);
  const [useridOk, setUseridOk] = useState("0");

  const handleIdCheck = () => {
    alert(`아이디 ${formData.userid}는 사용가능합니다.`);
    setUseridOk("1");
  };

  //const handleClick = () => {};

  //onchange 이벤트
  const handleChange = event => {
    const { name, value, type, checked, files } = event.target;
    //console.log(name, value, type, checked);
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData.userhobby, value]
          : formData.userhobby.filter(item => item !== value),
      });
      return;
    }

    //첨부파일 1개
    if (name === "userprofile") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      return;
    }

    //첨부파일 여러개
    if (name === "userfiles") {
      setFormData({
        ...formData,
        [name]: [...files],
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      //enter키 누르면 동작
      if (formData.userpass !== formData.userpassconfirm) {
        alert("입력한 비번이 서로 다릅니다!");
        setFormData({ ...formData, [event.target.name]: "" }); //내용 초기화
      }
    }
  };

  //form 전송하기
  const handleSubmit = event => {
    event.preventDefault(); //submit중단하고 유효성 검사
    //console.log(event);
    //console.log(event.target); //form
  };

  return (
    <MemberJoinForm>
      <h1>회원가입</h1>
      <form onSubmit={event => handleSubmit(event)}>
        {/* 회원가입 기본정보 입력 */}
        <fieldset>
          <legend>기본정보</legend>
          <ul>
            <li>
              <label htmlFor="userId">아이디</label>
              <input
                type="text"
                name="userid"
                id="userId"
                value={formData.userid}
                className="userId"
                placeholder="아이디"
                maxLength="12"
                minLength="4"
                onChange={event => handleChange(event)}
              />
              <button type="button" onClick={() => handleIdCheck()}>
                중복확인
              </button>
              <input type="hidden" name="useridOk" value={useridOk} />
            </li>
            <li>
              <label htmlFor="userPass">비밀번호</label>
              <input
                type="password"
                name="userpass"
                id="userPass"
                value={formData.userpass}
                placeholder="비밀번호"
                maxLength={15}
                onChange={event => handleChange(event)}
              />
            </li>
            <li>
              <label htmlFor="userPassConfirm">비밀번호 확인</label>
              <input
                type="password"
                id="userPassConfirm"
                name="userpassconfirm"
                value={formData.userpassconfirm}
                placeholder="비밀번호 확인"
                maxLength={15}
                minLength={8}
                onChange={event => handleChange(event)}
                onKeyDown={event => handleKeyDown(event)}
              />
              <p id="msgPassConfirm">
                비밀번호(6자리 이상,숫자,영어,특수문자 포함)를 입력하세요.
              </p>
              <input
                type="hidden"
                name="samecheck"
                value={formData.samecheck}
              />
            </li>
            <li>
              <label htmlFor="userEmail">이메일</label>
              <input
                type="email"
                name="useremail"
                id="userEmail"
                value={formData.useremail}
                placeholder="이메일"
                maxLength={30}
                onChange={event => handleChange(event)}
              />
            </li>
          </ul>
        </fieldset>

        {/* 회원가입 부가정보 입력 */}
        <fieldset>
          <legend>부가정보</legend>
          <ul>
            <li>
              <label htmlFor="userAge">나이</label>
              <input
                type="number"
                name="userage"
                id="userAge"
                value={formData.userage}
                placeholder="나이"
                maxLength={5}
                onChange={event => handleChange(event)}
              />
              세
            </li>
            <li>
              <label htmlFor="userGenderMan">성별</label>
              <input
                type="radio"
                name="usergender"
                id="userGenderMan"
                value="male"
                onChange={event => handleChange(event)}
                checked={formData.usergender === "male"}
              />
              <label htmlFor="userGenderMan">남성</label>

              <input
                type="radio"
                name="usergender"
                id="userGenderWomen"
                value="female"
                onChange={event => handleChange(event)}
                checked={formData.usergender === "female"}
              />
              <label htmlFor="userGenderWomen">여성</label>
            </li>
            <li>
              <label htmlFor="userArea">지역</label>
              <select
                name="userarea"
                id="userArea"
                value={formData.userarea}
                onChange={event => handleChange(event)}
              >
                <option value="">선택하세요.</option>
                <option value="seoul">서울</option>
                <option value="daegu">대구</option>
                <option value="busan">부산</option>
                <option value="jeju">제주</option>
              </select>
            </li>
            <li>
              <label htmlFor="userBirth">생년월일</label>
              <input
                type="date"
                name="userbirth"
                id="userBirth"
                value={formData.userbirth}
                placeholder="나이"
                maxLength="10"
                onChange={event => handleChange(event)}
              />
            </li>
            <li>
              <label htmlFor="userIntroduce">자기소개</label>
              <textarea
                name="userintroduce"
                id="userIntroduce"
                value={formData.userintroduce}
                placeholder="자기소개 입력"
                onChange={event => handleChange(event)}
              ></textarea>
            </li>
            <li>
              <label htmlFor="userProfile">프로필 사진</label>
              <input
                type="file"
                name="userprofile"
                id="userProfile"
                accept="image/png,image/jpeg"
                onChange={event => handleChange(event)}
              />
            </li>
            <li>
              <label htmlFor="userFiles">추가 첨부파일</label>
              <input
                type="file"
                name="userfiles"
                id="userFiles"
                onChange={event => handleChange(event)}
                multiple
              />
            </li>

            <li>
              <label htmlFor="userHobby1">취미활동</label>
              {["여행", "운동", "독서", "요리"].map((item, index) => {
                return (
                  <span
                    style={{ display: "flex", alignItems: "center" }}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      name="userhobby"
                      value={item}
                      id={`userHobby${index}`}
                      checked={formData.userhobby.includes(item)}
                      onChange={event => handleChange(event)}
                    />
                    <label htmlFor={`userHobby${index}`}>{item}</label>
                  </span>
                );
              })}
            </li>
          </ul>
        </fieldset>

        <JoinBtn>
          <button
            type="button"
            onClick={() => {
              setFormData(initData);
            }}
          >
            초기화
          </button>
          <button type="submit">회원가입</button>
        </JoinBtn>
      </form>
    </MemberJoinForm>
  );
};

export default EventSample1;
```

```jsx
//타자게임 만들기
import styled from "@emotion/styled";
import { useState } from "react";

/**
PRD (요구 사항 명세문서) 
- EventSample2.jsx

// 키보드 타이핑 연습 웹 앱서비스
// 1. 기본 문장이 주어진다.
// 2. 사용자는 텍스트 필드에 입력을 한다.
// 3. 사용자가 텍스트를 입력 중에 오타를 피드백 받는다.
// 3.1. 피드백은 입력 중 동일하게 작성중이면 
//      잘~~ 작성하고 계시네요(●'◡'●). 글자를 보여준다.
// 3.2. 피드백은 입력 중 일부가 다르면
//      오타에요(┬┬﹏┬┬).  글자를 보여준다.
// 4. 모든 문서가 맞게 작성되었다고 하면 Enter 키를 입력하고
//    몇초 걸렸는지를 출력한다. (setInterval)
*/

const InsertFormBox = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  input {
    width: 50%;
    height: 30px;
    border: 1px solid #ddd;
  }
  button {
    height: 30px;
  }
`;
const InsertText = styled.div`
  margin: 20px 0px;
`;
const TimerStart = styled.div`
  margin: 20px 0px;
`;

const EventSample2 = () => {
  const [insText, setInstext] = useState(""); //입력값
  const [returnMsg, setReturnMsg] =
    useState("✔ 입력폼에 텍스트를 입력하세요."); //피드백
  const [procTime, setProcTime] = useState(0); //지연시간
  const [oneTime, setOneTime] = useState(false); //타이머 1번만 실행되도록 처리
  const [timeId, setTimeId] = useState(null);

  const jungdap = "동해물과 백두산이 마르고 닳도록";

  const timerStart = () => {
    console.log(procTime);
    if (oneTime === false) {
      setOneTime(true);
      const timerName = setInterval(() => {
        //아래는 상태값 procTime을 참조한다.
        //아래는 실행될 당시의 값이다.
        //업데이트는 하고 있는데 다시 업데이트를 하면 오류다.
        //그러나 오류가 나도 띄워주지 않고 붇어버린다.
        //즉시 반영이 안되는 경우가 존재한다.
        //이유는 언제 업데이트되었는지를 보장할 수 없다.
        //setProcTime(procTime+1);

        //아래 방식은 state를 업데이트할 때 값이 아니라 업데이트 함수를 전달하는 것
        //아래는 함수라서 항상 실행을 보장한다.
        setProcTime(proc => proc + 1);
      }, 1000);
      setTimeId(timerName);
      console.log(timeId);
    }
  };

  const sameCheck = event => {
    setInstext(event.target.value);

    if (jungdap === event.target.value) {
      setReturnMsg("잘~~ 작성하고 계시네요(●'◡'●)");
    } else {
      setReturnMsg("오타에요(┬┬﹏┬┬)");
    }
  };

  const sameResult = event => {
    if (event.key === "Enter") {
      setReturnMsg("수고하셨습니다.");
      clearInterval(timeId);
    }
  };

  const procStart = () => {
    timerStart();
  };

  return (
    <InsertFormBox>
      <h1>타자게임</h1>
      <div>
        아래 문장을 작성하세요.
        <p style={{ fontWeight: "bold" }}>{jungdap}</p>
      </div>

      <TimerStart>
        <button type="button" onClick={procStart}>
          시작하기
        </button>
      </TimerStart>

      <InsertText>
        <label htmlFor="inserttext">입력폼 : </label>
        <input
          type="text"
          name="inserttext"
          id="inserttext"
          value={insText}
          onChange={event => sameCheck(event)}
          onKeyDown={event => sameResult(event)}
        />
      </InsertText>

      <div>결과폼 : {returnMsg}</div>
      <div>지연시간 : {procTime}초 경과</div>
    </InsertFormBox>
  );
};

export default EventSample2;
```

## 6. useEffect

### 6.1. 특징

- 리랜더링에서 제외됨

### 6.2. 최초 컴포넌트가 보일 때 용도

- 최초 화면에 컴포넌트 보이면 딱! 한번만 실행(함수, setState 한번만 ...)
- 최초 화면에 컴포넌트 보일 때 필요로 한 정보를 `백엔드 데이터 가지고 올 때` 딱! 한번만 실행
- window.addEventListener("resize",function(){});
- document.querySelector("") 등등 ...
- 아래는 `딱 한번만!`, 즉 보일 때 `실행`한다.

```jsx
useEffect(함수, state들의 의존성 배열[]);
useEffect(()=>{하고 싶은 일},[])
```

### 6.3. 컴포넌트의 `state가 변하는 것`을 `체크`하고자 할 때

- 리랜더링될 때
- 화면의 변화가 있을 때 마다 덩달아 해야할 일을 지정할 때

```js
useEffect(()=>{감시(state가 변하는 것)하다가 할일},[state1, state2, state3...])
```

### 6.4. 컴포넌트가 화면에서 사라질 때

- 마지막 처리하고자 하는 내용 실행

```js
useEffect(()=>{
  return () => {
    마지막 할일
    마지막 할일
  }
},[state1,state2...])
```

### 6.5. 아래 코드를 이해해 보자!

```jsx
useEffect(() => {
  window.addEventListener("resize", () => console.log("haha"));
  window.addEventListener("mouseover", () => console.log("haha"));

  return () => {
    //cleanup
    window.removeEventListener("resize", () => console.log("haha"));
    window.removeEventListener("mouseover", () => console.log("haha"));
  };
}, []);
```

## 7.