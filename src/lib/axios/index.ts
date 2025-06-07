import axios from "axios";


// const token = localStorage.getItem("accessToken");

const apiInstance = axios.create({
  
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

  //   withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },

});
export default apiInstance;
