import { useAxios } from "./hooks/useAxios";
import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCount";
import { useLogin } from "./hooks/useLogin";

function App() {
  const { count, add, minus, reset } = useCount(100);
  const { data, error, loading } = useAxios();
  const { data, isloading, error, isLogin, login } = useLogin();
  const windowSize = useComponent();

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <div>
        <button type="button" onClick={() => add()}>
          +10 증가 버튼
        </button>
        <button type="button" onClick={() => minus()}>
          -1 감소 버튼
        </button>
        <button type="button" onClick={() => reset()}>
          리셋 버튼
        </button>
      </div>
    </div>
  );
}

export default App;
