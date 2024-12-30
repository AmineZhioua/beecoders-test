import axios from "axios";
import { useAuth } from "./JWTContext";


const API_URL = import.meta.env.VITE_API_URL;


const useAxios = () => {
  const { token } = useAuth();

  const instance = axios.create({
    baseURL: API_URL,	
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
