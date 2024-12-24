import { useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const playVideo = () => {
    videoRef.current.play();
  };
  const stopVideo = () => {
    videoRef.current.stop();
  };
  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <div>
      <h1>useRef를 이용한 비디오 제어</h1>
      <div>
        <video ref={videoRef} src="" autoPlay controls muted></video>

        <div>
          <button type="button" onClick={playVideo}>
            play
          </button>
          <button type="button" onClick={stopVideo}>
            stop
          </button>
          <button type="button" onClick={pauseVideo}>
            일시정지
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
