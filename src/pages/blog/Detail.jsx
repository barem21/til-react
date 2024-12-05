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
