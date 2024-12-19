import { useContext } from "react";
import { UserInfoContext, UserInfoProvider } from "./contexts/UserInfoContent";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
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
