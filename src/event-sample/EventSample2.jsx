import styled from "@emotion/styled";
import { useState } from "react";

/**
PRD (요구 사항 명세문서) 
- EventSample2.jsx

// 키보드 타이핑 연습 웹 앱서비스
// 1. 기본 문장이 주어진다.
// 2. 사용자는 텍스트 필드에 입력을 한다.
// 3. 사용자가 텍스트를 입력 중에 오타를 피드백 받는다.
// 3.1. 피드백은 입력 중 동일하게 작성중이면 
//      잘~~ 작성하고 계시네요(●'◡'●). 글자를 보여준다.
// 3.2. 피드백은 입력 중 일부가 다르면
//      오타에요(┬┬﹏┬┬).  글자를 보여준다.
// 4. 모든 문서가 맞게 작성되었다고 하면 Enter 키를 입력하고
//    몇초 걸렸는지를 출력한다. (setInterval)
*/

const InsertFormBox = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  input {
    width: 50%;
    height: 30px;
    border: 1px solid #ddd;
  }
  button {
    height: 30px;
  }
`;
const InsertText = styled.div`
  margin: 20px 0px;
`;
const TimerStart = styled.div`
  margin: 20px 0px;
`;

const EventSample2 = () => {
  const [insText, setInstext] = useState(""); //입력값
  const [returnMsg, setReturnMsg] =
    useState("✔ 입력폼에 텍스트를 입력하세요."); //피드백
  const [procTime, setProcTime] = useState(0); //지연시간
  const [oneTime, setOneTime] = useState(false); //타이머 1번만 실행되도록 처리
  const [timeId, setTimeId] = useState(null);

  const jungdap = "동해물과 백두산이 마르고 닳도록";

  const timerStart = () => {
    console.log(procTime);
    if (oneTime === false) {
      setOneTime(true);
      const timerName = setInterval(() => {
        //아래는 상태값 procTime을 참조한다.
        //아래는 실행될 당시의 값이다.
        //업데이트는 하고 있는데 다시 업데이트를 하면 오류다.
        //그러나 오류가 나도 띄워주지 않고 붇어버린다.
        //즉시 반영이 안되는 경우가 존재한다.
        //이유는 언제 업데이트되었는지를 보장할 수 없다.
        //setProcTime(procTime+1);

        //아래 방식은 state를 업데이트할 때 값이 아니라 업데이트 함수를 전달하는 것
        //아래는 함수라서 항상 실행을 보장한다.
        setProcTime(proc => proc + 1);
      }, 1000);
      setTimeId(timerName);
      console.log(timeId);
    }
  };

  const sameCheck = event => {
    setInstext(event.target.value);

    if (jungdap === event.target.value) {
      setReturnMsg("잘~~ 작성하고 계시네요(●'◡'●)");
    } else {
      setReturnMsg("오타에요(┬┬﹏┬┬)");
    }
  };

  const sameResult = event => {
    if (event.key === "Enter") {
      setReturnMsg("수고하셨습니다.");
      clearInterval(timeId);
    }
  };

  const procStart = () => {
    timerStart();
  };

  return (
    <InsertFormBox>
      <h1>타자게임</h1>
      <div>
        아래 문장을 작성하세요.
        <p style={{ fontWeight: "bold" }}>{jungdap}</p>
      </div>

      <TimerStart>
        <button type="button" onClick={procStart}>
          시작하기
        </button>
      </TimerStart>

      <InsertText>
        <label htmlFor="inserttext">입력폼 : </label>
        <input
          type="text"
          name="inserttext"
          id="inserttext"
          value={insText}
          onChange={event => sameCheck(event)}
          onKeyDown={event => sameResult(event)}
        />
        {/* <button type="submit">전송하기</button> */}
      </InsertText>

      <div>결과폼 : {returnMsg}</div>
      <div>지연시간 : {procTime}초 경과</div>
    </InsertFormBox>
  );
};

export default EventSample2;
