#react-router-dom
- 리액트에는 http경로를 이용한 화면이동이 없습니다.
- 통상 http 경로를 `라우터`라고 합니다.
- `라우터`를 사용하려면 `react-router-dom`을 사용해야 합니다.

## 1. 참고사항
- 링크
```html
<a href="라우터">이동</a>
```
- form의 action
```
<form action="라우터">...</form>
```

## 2. URI의 구성
- `http://localhost:3000/todo/login?id=gutst&pass=1234`

### 2.1. Protocol (네트워킹을 위한 약속)
```
HTTP (HyperText Transfer Protocol)
 : 웹 브라우저와 서버 간의 데이터 전송.

HTTPS (HTTP Secure)
 : HTTP에 보안(SSL/TLS)을 추가한 프로토콜.

FTP (File Transfer Protocol)
 : 파일 전송에 사용.

SMTP (Simple Mail Transfer Protocol)
 : 이메일 전송.

IMAP (Internet Message Access Protocol)
 : 이메일 수신(서버에서 관리).

POP3 (Post Office Protocol 3)
 : 이메일 수신(다운로드 후 로컬 관리).

DNS (Domain Name System)
 : 도메인 이름을 IP 주소로 변환.

DHCP (Dynamic Host Configuration Protocol)
 : 동적 IP 주소 할당.
```

### 2.2. 도메인 (Domain)
- 일반적으로 대화에서는 `홈페이지 주소`로 이해
- 가끔 코딩할 때 `도메인`을 지켜서 `업무를 식별`해서 개발하세요.
- `DNS`는 `Domain Name System`으로서 IP에 글자이름 부여

### 2.3. Port 번호
- `:3000`
- `:80` port는 기본 포트입니다. (도메인으로 접속시 자동연결, 80은 안적으면 작동)

### 2.4. Path
- 경로 `/todo/login`
- 경로 `/member/login`

### 2.5. Query String
- 질의문 (질문하고 결과를 받겠다.)
- `?id=hahahoho`

## 3. URI를 이용하여 React에서 활용
- `react-router-dom`
- https://www.npmjs.com/package/react-router-dom
- https://reactrouter.com/start/framework/route-module
- 설치는 `npm i react-router-dom`

## 4. 활용 전에 먼저 고민해 보자.
- site map을 고민하자.
- 샘플
```
http://localhost:3000/ : 첫 페이지
http://localhost:3000/about : 소개
http://localhost:3000/about/mission : 소개 > 미션
http://localhost:3000/about/team : 소개 > 팀
http://localhost:3000/service : 서비스
http://localhost:3000/blog : 블로그
http://localhost:3000/blog/design : 블로그 > 디자인
http://localhost:3000/blog/design/1 : 블로그 > 디자인 > 1번글 보기 (REST API)
http://localhost:3000/blog/design/detail?id=1 : 블로그 > 디자인 > 1번글 보기 (query-string)
http://localhost:3000/blog/marketing : 블로그 > 마케팅
http://localhost:3000/blog/news : 블로그 > 뉴스
http://localhost:3000/portfolio : 포트폴리오
http://localhost:3000/contact : 연락하기
```

## 5. Router에 맞게 pages 폴더 구성하기
- `/` Root 페이지(라우터) : `src/pages/Index.jsx`를 말합니다.
- `/about` : `src/pages/about/Index.jsx`를 말합니다.
- `/about/team` : `src/pages/about/Team.jsx`를 말합니다.
- `/service` : `src/pages/service/Index.jsx`를 말합니다.
- `/service/now` : `src/pages/service/Now.jsx`를 말합니다.
- `/blog` : `src/pages/blog/Index.jsx`를 말합니다.
- `/blog/1` : `src/pages/blog/Detail.jsx`를 말합니다. (REST API)
- `/blog/list?id=1&cate=design` : `src/pages/blog/List.jsx`를 말합니다. (query-string)

## 6. Router 적용은 App.jsx에 하기로 합시다.
- 아래를 지켜주셔야 합니다.
- `as`(별칭, BrowserRouter as Router)를 확인하세요.
- `Router > Routes > Route`

### 6.1. 기본으로 작업하신다면
```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogListPage from "./pages/blog/List";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/service/now" element={<NowPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/1" element={<BlogDetailPage />} />
        <Route path="/blog/list?id=1&cate=design" element={<BlogListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 6.2. 중첩(Nested) 라우터
- `일반적`으로 활용해요.
- `<Route index component={컴포넌트} />` 주의하세요.
```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogListPage from "./pages/blog/List";
import BlogDetailPage from "./pages/blog/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about">
          <Route index element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route path="/service">
          <Route index element={<ServicePage />} />
          <Route index path="now" element={<NowPage />} />
        </Route>

        <Route path="/blog">
          <Route index element={<BlogPage />} />
          <Route path="1" element={<BlogDetailPage />} />
          <Route path="list?id=1&cate=design" element={<BlogListPage />} />
        </Route>
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
```


### 6.3. 존재하지 않는 path로 접근시 처리법
- path는 `*` 입니다. 제일 하단에 배치 권장
- `<Route path="*" element={<NotFound />} />`

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogListPage from "./pages/blog/List";
import BlogDetailPage from "./pages/blog/Detail";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about">
          <Route index element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route path="/service">
          <Route index element={<ServicePage />} />
          <Route index path="now" element={<NowPage />} />
        </Route>

        <Route path="/blog">
          <Route index element={<BlogPage />} />
          <Route path="1" element={<BlogDetailPage />} />
          <Route path="list?id=1&cate=design" element={<BlogListPage />} />
        </Route>

        {/* 존재하지 않는 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. 라우터에 `Params` 전달하기
- `Param` 단어를 💥꼭! 알아야 합니다.
- 백앤드 연동시 필수 내용!
- `패스/param`
- `http://localhost:5173/blog/10` : 10이 `param` 입니다.
- `http://localhost:5173/proc/21` : 21이 `param` 입니다.

```jsx
<Route path=":id" element={<BlogDetailPage />} />
```

```jsx
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  //console.log(a);

  return (
    <div>
      블로그(/blog/<b>{id}</b>, REST API 방식) 상세보기 페이지
    </div>
  );
}

export default Detail;
```

## 8. 쿼리 스트링(query-string) 활용하기
- `?`를 무엇이라고 했나요? `Search`(질의문)

```jsx
import { useSearchParams } from "react-router-dom";

function List() {
  const [searchParams, setSearchParams] = useSearchParams();

  //개별 데이터로 뜯기
  const id = searchParams.get("id");
  const cate = searchParams.get("cate");

  return (
    <div>
      블로그(/blog/id={id}&cate={cate}) 리스트 페이지 (query-string방식)
    </div>
  );
}

export default List;
```

## 9. 공통 레이아웃 적용하기
```
<header></header>
<main>URI에 따라 변하는 자리</main>
<footer></footer>
```

### 9.1. 기본 Link 이해하기
```jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogListPage from "./pages/blog/List";
import BlogDetailPage from "./pages/blog/Detail";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">❤홈으로</Link>/<Link to="/about">🧡소개</Link>/
        <Link to="/about/team">🧡소개-Team</Link>/
        <Link to="/service">💛서비스</Link>/
        <Link to="/service/now">💛서비스-Now</Link>/
        <Link to="/blog">💚블로그</Link>/<Link to="/blog/1">💚블로그-:id</Link>/
        <Link to="/blog/list?id=1&cate=design">💚블로그-queryString</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />} />
            <Route index path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog">
            <Route index element={<BlogPage />} />
            <Route path=":id" element={<BlogDetailPage />} />
            <Route path="list" element={<BlogListPage />} />
          </Route>
          {/*<Route path="/blog/:id" element={<BlogDetailPage />} />*/}

          {/* 존재하지 않는 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>하단</footer>
    </Router>
  );
}

export default App;
```

### 9.2. components로 Header.jsx 만들기
```jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      {/* 상단</header> */}
      <Link to="/">❤홈으로</Link>/<Link to="/about">🧡소개</Link>/
      <Link to="/about/team">🧡소개-Team</Link>/
      <Link to="/service">💛서비스</Link>/
      <Link to="/service/now">💛서비스-Now</Link>/
      <Link to="/blog">💚블로그</Link>/<Link to="/blog/1">💚블로그-:id</Link>/
      <Link to="/blog/list?id=1&cate=design">💚블로그-queryString</Link>
    </header>
  );
};

export default Header;
```

### 9.3. components로 Footer.jsx 만들기
```jsx
const Footer = () => {
  return <footer>하단</footer>;
};

export default Footer;
```

## 10. 페이지에 Props 전달하기
- 예제 1
```jsx
<Route
  path="/"
  element={
    <HomePage title={"좋은회사"} year={2024} version={"v1.0"} />
  }
/>
```
```jsx
function Index({ title, year, version }) {
  return (
    <div>
      {year} {title} 메인(/) 페이지 {version}
    </div>
  );
}

export default Index;
```

- 예제 2
```jsx
//MockUp Data
const BlogDatas = [
  {
    id: "1",
    title: "hello~",
    cate: "design",
    content: "안녕하시렵니까?",
    date: "2024-12-05",
  },
  {
    id: "2",
    title: "hello world~",
    cate: "coding",
    content: "코딩 시작",
    date: "2024-12-04",
  },
];

<Route index element={<BlogPage data={BlogDatas} />} />
```

```jsx
import { Link } from "react-router-dom";

function Index({ data }) {
  return (
    <div>
      <h1>블로그(/blog) 첫 페이지</h1>
      <ul>
        {data.map(item => {
          return (
            <li key={item.id}>
              <div>
                {item.title}
                <button type="button">
                  <Link to={`/blog/${item.id}`}>상세보기</Link>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
```

## 11. 페이지에 Props 중에 children 전달하기
```jsx
<Footer>
  <p>Copyright 2024 by hong. All right Reserved.</p>
  {isMember ? <p>로그인 상태입니다.</p> : <p>로그아웃 상태입니다.</p>}
</Footer>
```

```jsx
const Footer = ({ children }) => {
  return <footer>{children}</footer>;
};

export default Footer;
```

## 12. react-router-dom의 `Outlet` 이해하기
- `Router`를 이용해서 페이지의 레이아웃을 유지하고
- `Router의 Outlet장소`에 `path`에 따라서 `컴포넌트 출력`
- 반드시 `중첩 Route 여야 가능`
- 샘플 예제
```
1. Layout용 페이지를 만든다.
2. 처음에 index 컴포넌트가 보인다.
3. 그래서 사용자가 블로그 목록을 보고 있다.
4. 블로그 목록에서 상세보기를 클릭하면
5. 레이아웃에 상세내용이 출력된다.
```
- /src/pages/blog/Layout.jsx 생성

```jsx
<Route path="/blog" element={<Layout />}>
  <Route index element={<BlogPage data={BlogDatas} />} />
  <Route path="list" element={<BlogListPage />} />
  <Route path=":id" element={<BlogDetailPage />} />
</Route>
```

```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div>로컬메뉴</div>
      <div>
        <h2>Outlet 자리</h2>
        <div style={{ backgroundColor: "#eee", padding: 10 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
```

## 13. `Outlet`과 `Children`의 비교
- 공통점 : JSX를 전달한다.
- 차이점
 : `Children`은 `props`로 전달 (태그의 내용처럼)
 : `Outlet`은 `중첩 Route`에 전달

 ```jsx
<Footer>
  <p>Copyright 2024 by hong. All right Reserved.</p>
</Footer>
 ```

 ```jsx
<Route path="/blog" element={<Layout />}>
  <Route />
  <Route />
</Route>
 ```

 ## 14. Path 및 Params를 실시간 생성하기
 ### 14.1. `문자열`, 또는 `백틱`으로 생성하면 된다.
 ```js
const path="/service";
const path=`/service`;
const path=`/service/${id}`;
const path=`/service/id=${변수}&num=${변수}`; //SearchParams
```

### 14.2. SearchParams를 만들기
```js
const queryStr=createSearchParams({키:값,키:값}).toString();
const path=queryStr;
```

### 14.3. `Link to=경로`말고 `js로 강제 이동`하기
```js
import { useNavigate } from "react-router-dom";

const navigate=useNavigate();
const path=`/service`;
navigate(path);
```

### 14.4. 현재 `path`를 알고 싶어요!
```js
import { useLocation } from "react-router-dom";

const { pathname, search, state } = useLocation();
console.log(location);
```

### 14.5. `state` 사용자 모르게 라우터에 전달하기
- `Link to`로는 어렵다.
- useNavigate() 이용

```js
import { useNavigate } from "react-router-dom";

const navigate=useNavigate();
const path=`/service`;
const hiddenInfo={
  memo:"블로그에서 왔구나?",
  good:"1번 제품을 보고 있었네?",
}

navigate({pathname: path, search:"id=1",},{state:{hiddenInfo}});
```
