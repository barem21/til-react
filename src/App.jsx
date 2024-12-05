import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const LazyHeader = lazy(() => import("./components/Header"));
const LazyFooter = lazy(() => import("./components/Footer"));
const LazyHomePage = lazy(() => import("./pages/Index"));
const LazyAboutPage = lazy(() => import("./pages/about/Index"));
const LazyTeamPage = lazy(() => import("./pages/about/Team"));
const LazyServicePage = lazy(() => import("./pages/service/Index"));
const LazyNowPage = lazy(() => import("./pages/service/Now"));
const LazyBlogPage = lazy(() => import("./pages/blog/Index"));
const LazyBlogListPage = lazy(() => import("./pages/blog/List"));
const LazyBlogDetailPage = lazy(() => import("./pages/blog/Detail"));
const LazyLayout = lazy(() => import("./pages/blog/Layout"));
const LazyNotFound = lazy(() => import("./pages/404"));

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
      <LazyHeader />
      <main>
        <Routes>
          {/* 로딩창 구현 */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyHomePage title={"좋은회사"} year={2024} version={"v1.0"} />
              </Suspense>
            }
          ></Route>

          <Route path="/about">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <LazyAboutPage />
                </Suspense>
              }
            />
            <Route
              path="team"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyTeamPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="/service">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <LazyServicePage />
                </Suspense>
              }
            />
            <Route
              index
              path="now"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyNowPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/blog"
            element={
              <Suspense fallback={<Loading />}>
                <LazyLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <LazyBlogPage data={BlogDatas} />
                </Suspense>
              }
            />
            <Route
              path="list"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyBlogListPage />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyBlogDetailPage />
                </Suspense>
              }
            />
          </Route>
          {/*<Route path="/blog/:id" element={<BlogDetailPage />} />*/}

          {/* 존재하지 않는 페이지 */}
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <LazyNotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <LazyFooter>
        <p>Copyright 2024 by hong. All right Reserved.</p>
        {isMember ? <p>로그인 상태입니다.</p> : <p>로그아웃 상태입니다.</p>}
      </LazyFooter>
    </Router>
  );
}

export default App;
