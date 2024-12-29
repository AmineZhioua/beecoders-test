import axios from "axios";
import { useAuth } from "./JWTContext";

const useAxios = () => {
  const { token } = useAuth();

  const instance = axios.create({
    baseURL: "http://localhost:5000",
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxios;
