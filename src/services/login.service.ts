import { IFormInputRegister } from "../interfaces";
import { axiosInstance } from "../server/axios.config";

export const regsiter = async (data: IFormInputRegister) => {
  return await axiosInstance.post("/auth/local/register", data);
};
