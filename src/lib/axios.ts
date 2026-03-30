import axios from "axios";

const api = axios.create({
  baseURL: "https://toughangle-us.backendless.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user-token");
  if (token) {
    config.headers["user-token"] = token;
  }
  return config;
});

export default api;