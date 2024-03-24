import { ITodoForm } from "../interfaces";
import { axiosInstance } from "../server/axios.config";

export const getAllTodos = async (page: number) => {
  const { data } = await axiosInstance.get(`/todos?pagination[page]=${page}`);
  return data;
};

export const getTodoList = async () => {
  const { data } = await axiosInstance.get("/users/me?populate=todos");
  return data.todos;
};

export const addNewTodo = async (data: ITodoForm, userId: number) => {
  return await axiosInstance.post("/todos", {
    data: { ...data, user: [userId] },
  });
};

export const updateTodo = async (id: number, data: ITodoForm) => {
  return await axiosInstance.put(`/todos/${id}`, { data });
};

export const deleteTodo = async (id: number) => {
  return await axiosInstance.delete(`/todos/${id}`);
};
