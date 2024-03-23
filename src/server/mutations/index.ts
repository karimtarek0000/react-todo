import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IError, ITodoForm } from "../../interfaces";
import { deleteTodo, updateTodo } from "../../services";

export const useEditTodo = (callBack: () => void) => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITodoForm }) =>
      updateTodo(id, data),
    onSuccess() {
      toast.success("Update todo successfully");
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
      toast.success("Delete todo successfully");
      callBack();
    },
    onError(error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    },
  });
};
