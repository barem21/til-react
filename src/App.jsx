import { useCallback, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  //query가 변경이 된다면 그때 함수를 다시 정의하겠다.
  const handleSearch = useCallback(() => {
    console.log("query를 처리하는 새로운 함수 생성 : ", query);
  }, [query]);

  return (
    <div>
      <h1>state 변경시 함수 실행</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
}
export default App;
