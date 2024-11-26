import styled from "@emotion/styled";
import { DataStyle } from "./popup";

const PopupTitle = styled.h2`
  color: #ff2200;
  font-size: ${props => props.fs || 24}px;
  font-weight: 700;
`;
const PopupContents = styled.div`
  font-size: 14px;
`;
const SlideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.hh}px;
  background-color: ${props => props.bg || "#fff"};
`;
const BannerDiv = styled.div`
  position: relative;
  background-color: ${props => props.bg || "#fff"};
  width: ${props => props.ww || 100}px;
  height: ${props => props.hh || 50}px;
`;
const NoticeDiv = styled.div``;

const Pop = () => {
  const title = "팝업 타이틀";
  const data = "팝업 내용";

  return (
    <div>
      <PopupTitle fs={20}>{title}</PopupTitle>
      <PopupContents style={DataStyle}>{data}</PopupContents>
      <SlideDiv bg={"#e5e5e5"} hh={50}>
        슬라이드
      </SlideDiv>
      <BannerDiv bg={"#ffcc00"} ww={200} hh={100}>
        배너 1
      </BannerDiv>
      <BannerDiv bg={"#ff4400"} ww={100} hh={100}>
        배너 2
      </BannerDiv>
      <BannerDiv>배너 3</BannerDiv>
      <NoticeDiv>공지사항</NoticeDiv>
    </div>
  );
};

export default Pop;
