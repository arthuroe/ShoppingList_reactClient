import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

instance.interceptors.request.use(config => {
  config.headers.common["Authorization"] = window.localStorage.getItem("token");
  return config;
});
export default instance;