import axios from "axios";

const apiUrl = import.meta.env.VITE_BOOKWORM_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// You can add interceptors here if needed
axiosInstance.interceptors.request.use((config) => {
  // Add authorization token to headers if needed
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
