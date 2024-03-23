import { ITodoForm } from "../interfaces";
import { axiosInstance } from "../server/axios.config";

export const getTodoList = async () => {
  const { data } = await axiosInstance.get("/users/me?populate=todos");
  return data.todos;
};

export const addNewTodo = async (data: ITodoForm) => {
  const id = JSON.parse(localStorage.getItem("user") as string)?.id;
  return await axiosInstance.post("/todos", { data: { ...data, user: [id] } });
};

export const updateTodo = async (id: number, data: ITodoForm) => {
  return await axiosInstance.put(`/todos/${id}`, { data });
};

export const deleteTodo = async (id: number) => {
  return await axiosInstance.delete(`/todos/${id}`);
};
