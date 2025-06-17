import axios from "axios";

<<<<<<< HEAD

// const token = localStorage.getItem("accessToken");

const apiInstance = axios.create({
  
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

  //   withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },

=======
export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL,
  // withCredentials: true,
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
});
export default apiInstance;
