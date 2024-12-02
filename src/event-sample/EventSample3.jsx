import { useState } from "react";

const EventSample3 = () => {
  const [timerCount, setTimerCount] = useState(3600); //타이머 초
  const [oneTime, setOneTime] = useState(false); //타이머 실행상태
  const [timeId, setTimeId] = useState(null); //setinterval ID(타이머 중지를 위해서)

  //시:분:초로 변경하기
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600); //시
    const minutes = Math.floor((seconds % 3600) / 60); //분
    const remainingSeconds = seconds % 60; //초

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  //타이머 프로세스
  const procStart = () => {
    console.log(timerCount);

    if (oneTime === false) {
      //타이머 멈춤 상태이면
      setOneTime(true); //타이머 동작 시작으로 변경

      const timerName = setInterval(() => {
        //인터벌 동작
        setTimerCount(proc => proc + 1);
      }, 1000);

      setTimeId(timerName); //interval Id 저장
    }
  };

  //타이머 멈춤
  const timerStop = () => {
    clearInterval(timeId);
    setTimeId(null);
  };

  //타이머 초기화
  const timerReset = () => {
    setTimerCount(3600);
    setOneTime(false);
    setTimeId(null);
    clearInterval(timeId);
  };

  //타이머 시작
  const timerStart = () => {
    procStart();
    setOneTime(false);
  };

  return (
    <div>
      <h1>타이머 만들기</h1>
      <div>
        <button onClick={() => timerStart()}>타이머 시작</button>
        <button onClick={() => timerStop()}>타이머 종료</button>
        <button onClick={() => timerReset()}>타이머 초기화</button>
      </div>

      <div style={{ fontSize: "36px" }}>{formatTime(timerCount)}</div>
    </div>
  );
};

export default EventSample3;
