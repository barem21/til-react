import { useEffect, useState } from "react";

//일반적으로 FE개발자는 BE와 API통신을 할거다.
//일반적으로 FE개발자는 주소와 자료를 전달하고 결과를 받을 것이다.
//일반적으로 FE개발자는 get, post, put, delete를 사용할 것이다.
//내가 API통신을 편리하게 사용할 수 있는 hook을 만들어서 팀의 API통신 컨벤션을 제공하겠다.

//일반적 사용을 조사
// const { data, error, loading } = useAxios("주소", "자료", "get");
// const { data, error, loading } = useAxios("주소", "자료", "GET");
// const { data, error, loading } = useAxios("주소", { 자료 }, "post");
// const { data, error, loading } = useAxios("주소", null, "put");
// const { data, error, loading } = useAxios("주소", 1, "delete");

export function useAxios(_url, _payload = null, _method) {
  //api회신 결과
  const [data, setData] = useState(null);

  //api회신 오류 결과
  const [error, setError] = useState(null);

  //api호출 진행중
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); //로딩 시작
    const fetchAPI = async () => {
      try {
        let response;
        let method = _method.toUppercase(_method); //대문자로 method 통일함
        switch (method) {
          case "GET": //axios.get("주소?id=1&num=1")
            response = await axios.get(_url, _payload);
            break;
          case "POST": //axios.post("주소",{객체})
            response = await axios.post(_url, _payload);
            break;
          case "PUT": //axios.put("주소",{객체})
            response = await axios.put(_url, _payload);
            break;
          case "DELETE": //axios.post("주소?id=1")
            response = await axios.delete(_url, _payload);
            break;
          default:
            throw new Error(`${_method} 잘못 보내셨네요.`);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchAPI();
    setLoading(false);
  }, [_url, _payload, _method]);
  return { data, error, loading };
}
