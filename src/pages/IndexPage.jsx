import Header from "../components/Header";
import Footer from "../components/Footer";
import "./indexpage.css";

function IndexPage() {
  return (
    <>
      <Header></Header>
      <main>
        <div className="layout">
          <div>공지사항/갤러리</div>
          <div>배너</div>
          <div>바로가기</div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default IndexPage;
