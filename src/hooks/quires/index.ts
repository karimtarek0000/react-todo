import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../../services";

export const useFetchTodo = () => {
  return useQuery({
    queryKey: ["todoList"],
    queryFn: getTodoList,
  });
};
