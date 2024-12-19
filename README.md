# Context API

- 용도
  : 웹 앱서비스의 기본적으로 관리할 자료보관 및 처리
  : 사용자 로그인 정보, 테마, 장바구니 등
- 특징
  : 개별 컴포넌트의 state가 아니라 앱 전체의 state이다.
  : Context로도 충분하지만 좀 더 복잡한 데이터 처리 라이브러리 많음
  : Redux (난이도 높음)
  : Recoil (난이도 낮고, 국내 활성화)
  : Zustand (난이도 낮고, 해외 활성화, 국내 활성화 중)

## useState로 state를 관리해 보자

- ,useState는 각 컴포넌트가 state를 관리하는 형식
- Drilling으로 인한 문제점을 이해해 보자.
- 예제 코드

```jsx
import { useState } from "react";

function App() {
  //useState로 로그인한 사용자 정보 관리
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "guest",
  });

  const Header = ({ userInfo }) => {
    return (
      <header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>logo</p>
          <nav>
            {userInfo.userId === "" ? (
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setUserInfo({
                      userId: "hong",
                      userName: "길동",
                      userRole: "member",
                    })
                  }
                >
                  로그인
                </button>
                <button type="button" onClick={() => {}}>
                  회원가입
                </button>
              </div>
            ) : (
              <div>
                {userInfo.userName}님, 환영합니다.
                <button
                  type="button"
                  onClick={() =>
                    setUserInfo({ userId: "", userName: "", userRole: "guest" })
                  }
                >
                  로그아웃
                </button>
                <button type="button" onClick={() => {}}>
                  정보수정
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  };

  const Main = ({ userInfo }) => {
    return (
      <main
        style={{
          margin: "40px 0px",
          padding: "30px",
          backgroundColor: "#f0f0f0",
        }}
      >
        {userInfo.userId === "" ? (
          <div>로그인이 필요합니다!</div>
        ) : (
          <>
            <Character userInfo={userInfo} />
            <Friend userInfo={userInfo} />
            <Point userInfo={userInfo} />
            <Map userInfo={userInfo} />
            <Qna userInfo={userInfo} />
          </>
        )}
        <div></div>
      </main>
    );
  };

  const Footer = ({ userInfo }) => {
    return <footer>하단 {userInfo.userRole}</footer>;
  };

  const Character = ({ userInfo }) => {
    return (
      <div>
        <div>{userInfo.userName} 님의 캐릭터 변경 서비스</div>
        <ChoiceCharacter userInfo={userInfo}>
          캐릭터 종류 선택 서비스
        </ChoiceCharacter>
      </div>
    );
  };
  const ChoiceCharacter = ({ userInfo }) => {
    return <div>{userInfo.userName} 님의 캐릭터 종류 선택 서비스</div>;
  };
  const Friend = ({ userInfo }) => {
    return <div>{userInfo.userId} 님의 친구 관리 서비스</div>;
  };
  const Point = ({ userInfo }) => {
    return <div>{userInfo.userName} 님의 포인트 관리 서비스</div>;
  };
  const Map = ({ userInfo }) => {
    return <div>{userInfo.userId} 님의 지도 관리 서비스</div>;
  };
  const Qna = ({ userInfo }) => {
    return <div>{userInfo.userName} 님의 QA 관리 서비스</div>;
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo}></Header>
      <Main userInfo={userInfo} />
      <Footer userInfo={userInfo} />
    </div>
  );
}

export default App;
```

## Context API 활용

### 추천 폴더 구조

- `/src/contexts` 폴더 생성을 권장
  : context는 `문맥`이라고 합니다.
  : context는 `일관성`이라고 합니다.
  : context는 `목표`라고 합니다.
  : context는 `프로그램의 전체 목표를 이루기 위한 흐름`이라고 합니다.

### 추천 파일

- `/src/contexts/` 파일 생성
  : 예) UserInfoContent.jsx

```jsx
import { createContext, useState } from "react";

//외부에서 context state를 사용하므로 export 처리
export const UserInfoContext = createContext();
//context에 지정한 범위로 접근해서
//context에 만들어둔 값을 읽기 기능,
//context에 만들어둔 기능을 사용기능을 위한 공급자(Provider) 생성
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "guest",
  });
  //return (값, 기능 목록 등...);
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {/* 지역범위 */}
      {children}
    </UserInfoContext.Provider>
  );
};
```

- App.jsx

```jsx
import { useContext } from "react";
import { UserInfoContext, UserInfoProvider } from "./contexts/UserInfoContent";

const Header = () => {
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>logo</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                type="button"
                onClick={() =>
                  setUserInfo({
                    userId: "hong",
                    userName: "길동",
                    userRole: "member",
                  })
                }
              >
                로그인
              </button>
              <button type="button" onClick={() => {}}>
                회원가입
              </button>
            </div>
          ) : (
            <div>
              {userInfo.userName}님, 환영합니다.
              <button
                type="button"
                onClick={() =>
                  setUserInfo({ userId: "", userName: "", userRole: "guest" })
                }
              >
                로그아웃
              </button>
              <button type="button" onClick={() => {}}>
                정보수정
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const Main = () => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <main
      style={{
        margin: "40px 0px",
        padding: "30px",
        backgroundColor: "#f0f0f0",
      }}
    >
      {userInfo.userId === "" ? (
        <div>로그인이 필요합니다!</div>
      ) : (
        <>
          <Character />
          <Friend />
          <Point />
          <Map />
          <Qna />
        </>
      )}
      <div></div>
    </main>
  );
};

const Footer = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <footer>하단 {userInfo.userRole}</footer>;
};

const Character = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div>
      <div>{userInfo.userName} 님의 캐릭터 변경 서비스</div>
      <ChoiceCharacter>캐릭터 종류 선택 서비스</ChoiceCharacter>
    </div>
  );
};
const ChoiceCharacter = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName} 님의 캐릭터 종류 선택 서비스</div>;
};
const Friend = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userId} 님의 친구 관리 서비스</div>;
};
const Point = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName} 님의 포인트 관리 서비스</div>;
};
const Map = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userId} 님의 지도 관리 서비스</div>;
};
const Qna = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName} 님의 QA 관리 서비스</div>;
};

function App() {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <UserInfoProvider>
        <Header />
        <Main />
        <Footer />
      </UserInfoProvider>
    </div>
  );
}

export default App;
```
