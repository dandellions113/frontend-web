import axios from "axios";
import Cookies from "js-cookie";
import { getCookie, removeCookie } from "../Utils/cookieUtils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    // You can add other common headers here
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = getCookie("jwtToken");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove the JWT token from the cookies
      removeCookie("jwtToken");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
