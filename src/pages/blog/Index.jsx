import { Link, useLocation, useNavigate } from "react-router-dom";

function Index({ data }) {
  const navigate = useNavigate();
  const { pathname, search, state } = useLocation();
  console.log(location);

  return (
    <div>
      <h1>블로그(/blog) 첫 페이지</h1>
      {/* 목록 */}
      <ul>
        {data.map(item => {
          return (
            <li key={item.id}>
              <div>
                {item.title}
                <button type="button">
                  <Link to={`/blog/${item.id}`}>상세보기</Link>
                </button>
                <button onClick={() => navigate(`/blog/${item.id}`)}>
                  상세보기2
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
