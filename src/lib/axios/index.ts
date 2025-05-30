import axios from "axios";

// const token = localStorage.getItem("accessToken");

const apiInstance = axios.create({
  // 임시api
  baseURL: "https://mogazoa-api.vercel.app/default",

  //   withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
});
export default apiInstance;
