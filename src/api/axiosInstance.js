import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
