import { API_URL, axiosInstance } from "./config";

//API 매서드
//회원 전체목록
export const getMembers = async () => {
  try {
    const res = await axiosInstance.get(API_URL);
    //console.log(res.status);

    //fetch쓸 경우에는 아래 방식으로
    //const data = await res.json();
    //console.log(data);

    //리턴값 첫번째 자리 확인
    const responseStatus = res.status.toString().charAt(0);

    if (responseStatus === "2") {
      //성공
      return res.data;
    } else {
      console.log("데이터가 없어요!");
      return [];
    }
  } catch (error) {
    //리턴값 첫번째 자리 확인(첫자리가 4라면 우리를 의심하자(오타 등))
    const errorStatus = error.response.status.toString().charAt(0);

    if (errorStatus === "5") {
      alert("서버가 꺼졌어요!");
    }
    if (errorStatus === "4") {
      alert("호출이 실패되었습니다!");
    }
    console.log(error);
    return [];
  }
};

export const getMeber = async _id => {
  try {
    const res = axiosInstance.get(`${API_URL}/${_id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

//회원 삭제
export const deleteMember = async _id => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${_id}`);
    //console.log(res);
    //alert("삭제 완료!");
    //return res.data;
    return "success";
  } catch (error) {
    console.log(error);
    //return error.response.status;
    return "fail";
  }
};
