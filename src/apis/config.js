import axios from "axios";

//api url
export const API_URL = "http://localhost:5000/member";

//axios 인스턴스 생성하기
export const axiosInstance = new axios.create();
