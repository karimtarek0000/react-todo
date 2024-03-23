import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IError, ITodoForm } from "../../interfaces";
import { addNewTodo, deleteTodo, updateTodo } from "../../services";

export const useEditTodo = (callBack: () => void) => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITodoForm }) =>
      updateTodo(id, data),
    onSuccess() {
      toast.success("Todo updated successfully");
      callBack();
    },
    onError(error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    },
  });
};

export const useDeleteTodo = (callBack: () => void) => {
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess() {
      toast.success("Todo deleted successfully");
      callBack();
    },
    onError(error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    },
  });
};

export const useAddTodo = (callBack: () => void) => {
  return useMutation({
    mutationFn: (data: ITodoForm) => addNewTodo(data),
    onSuccess() {
      toast.success("Todo added successfully");
      callBack();
    },
    onError(error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    },
  });
};
