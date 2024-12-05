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
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import Layout from "./pages/blog/Layout";

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
  {
    id: "3",
    title: "ready!",
    cate: "error",
    content: "에러 확인하기!",
    date: "2024-12-03",
  },
  {
    id: "4",
    title: "omg!",
    cate: "design",
    content: "오 마이 갓!",
    date: "2024-12-02",
  },
];

function App() {
  const [isMember, setIsMember] = useState(false);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage title={"좋은회사"} year={2024} version={"v1.0"} />
            }
          />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />} />
            <Route index path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog" element={<Layout />}>
            <Route index element={<BlogPage data={BlogDatas} />} />
            <Route path="list" element={<BlogListPage />} />
            <Route path=":id" element={<BlogDetailPage />} />
          </Route>
          {/*<Route path="/blog/:id" element={<BlogDetailPage />} />*/}

          {/* 존재하지 않는 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 by hong. All right Reserved.</p>
        {isMember ? <p>로그인 상태입니다.</p> : <p>로그아웃 상태입니다.</p>}
      </Footer>
    </Router>
  );
}

export default App;
