import { useState } from "react";

const Sample3 = () => {
  const [isDark, setIsDark] = useState(false);
  const ThemeCss = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: isDark ? "#000" : "#fff",
    translation: "0.5s",
  };
  return (
    <div style={ThemeCss}>
      <button onClick={() => setIsDark(!isDark)}>다크모드</button>
    </div>
  );
};

export default Sample3;
