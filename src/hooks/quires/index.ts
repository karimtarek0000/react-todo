import { useQuery } from "@tanstack/react-query";
import { getAllTodos, getTodoList } from "../../services";

export const useFetchTodo = () => {
  return useQuery({
    queryKey: ["todoList"],
    queryFn: getTodoList,
  });
};

export const useFetchAllTodos = (page: number = 1) => {
  return useQuery({
    queryKey: ["todos", `todos-page-${page}`],
    queryFn: () => getAllTodos(page),
  });
};
