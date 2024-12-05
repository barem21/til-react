import { useSearchParams } from "react-router-dom";

function List() {
  const [searchParams, setSearchParams] = useSearchParams();
  //console.log(searchParams);

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
