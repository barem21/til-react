import { useMemo } from "react";
import { useState } from "react";

function App() {
  // 데이터를 정렬한다.
  const [sortBy, setSortBy] = useState("id");
  // 백엔드에서 받은 회원 목록 데모 데이터
  const data = [
    { id: 1, name: "Bbc", age: 40 },
    { id: 2, name: "Abc", age: 25 },
    { id: 3, name: "Ccc", age: 35 },
  ];
  // 복잡한 연산을 매번 실행하지 않고, sortBy 가 바뀐 경우만 정렬하고 싶다.
  const sortData = useMemo(() => {
    console.log("정렬함", sortBy);
    //아래 sort 구문은 조건에 따라서 true, false를 반복하면 순서배치 진행
    return [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }, [sortBy]);
  console.log(sortData);

  return (
    <div>
      <h1>배열의 속성을 이용한 정렬</h1>
      <div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value={"id"}>ID</option>
          <option value={"name"}>NAME</option>
          <option value={"age"}>AGE</option>
        </select>
        <table border="1">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            {sortData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
