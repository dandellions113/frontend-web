import axios from "axios";
import { getCookie } from "../Utils/cookieUtils";

// Create an Axios instance with custom configuration
const authAxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    // You can add other common headers here
  },
});

export default authAxiosInstance;
