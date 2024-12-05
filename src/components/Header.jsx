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
