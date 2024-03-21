import { axiosInstance } from "../server/axios.config";

export const getTodoList = async () => {
  const { data } = await axiosInstance.get("/users/me?populate=todos");
  return data.todos;
};
