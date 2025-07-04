import axios from "axios";

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL,
  // withCredentials: true,
});
export default apiInstance;
