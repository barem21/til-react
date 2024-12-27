//로그인에 관련된 코드를 모아둔다.
//더불어서 컴포넌트는 아니지만 use훅들을 사용했다.
//일반 함수에서는 use훅들을 사용하지 못한다.
//그러면 custom hook 만들어서 활용한다.

import { useState } from "react";

export const useLogin = () => {
  //로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  //사용자 정보
  const [data, setData] = useState(null);

  //서버 에러
  const [error, setError] = useState(null);

  //서버 연결중
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("api/signIn");
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, isLogin, login };
};
