import { ReactNode, useContext } from "react";
import { Auth } from "../context";
import { axiosInstance } from "./axios.config";

const Interceptor = ({ children }: { children: ReactNode }) => {
  const auth = useContext(Auth);

  axiosInstance.interceptors.request.use(
    (req) => {
      const token = auth.userData.jwt;
      if (token) req.headers.Authorization = `Bearer ${token}`;
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return children;
};

export default Interceptor;
