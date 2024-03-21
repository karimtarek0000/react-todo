import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IError, ITodo, ITodoForm } from "../interfaces";
import { getTodoList, updateTodo } from "../services";
import { validationTodoSchema } from "../validations/form";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";

const TodoList = () => {
  // ----------------- STATE -----------------
  const modal = useRef<any>();
  const [todoForEdit, setTodoForEdit] = useState<ITodo>({} as ITodo);

  // ----------------- QUIRES -----------------
  const {
    data,
    isLoading,
    refetch: fetchTodoList,
  } = useQuery({
    queryKey: ["todoList"],
    queryFn: getTodoList,
  });

  // ----------------- HANDLER -----------------
  const openModal = (): void => modal.current.openModal();
  const closeEditModal = (): void => {
    setTodoForEdit({} as ITodo);
    modal.current.closeModal();
  };
  const pickForEditHandler = (todo: ITodo): void => {
    openModal();
    setTodoForEdit(todo);
  };

  // ----------------- MUTATIONS -----------------
  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITodoForm }) =>
      updateTodo(id, data),
    onSuccess() {
      toast.success("Update a todo successfully");
      fetchTodoList();
      closeEditModal();
    },
    onError(error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    },
  });

  // ----------------- VALIDATION'S -----------------
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ITodoForm>({
    resolver: yupResolver(validationTodoSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<ITodoForm> = (todo: ITodoForm) =>
    mutate({ id: todoForEdit.id, data: todo });

  // To set new data when pick a TODO
  useEffect(() => {
    if (Object.keys(todoForEdit).length) {
      clearErrors();
      setValue("title", todoForEdit.title);
      setValue("description", todoForEdit.description);
    }
  }, [clearErrors, setValue, todoForEdit]);

  // Loading
  if (isLoading) return <h2>Loading...</h2>;

  // ----------------- RENDER -----------------
  const renderTodosList = data?.map((todo: ITodo) => {
    return (
      <div
        key={todo.id}
        className="flex items-center justify-between p-3 duration-300 rounded-md hover:bg-gray-100 even:bg-gray-100"
      >
        <p className="w-full font-semibold">{todo.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"} onClick={() => pickForEditHandler(todo)}>
            Edit
          </Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className="space-y-1 ">
      {renderTodosList}

      <Modal
        ref={modal}
        title="Edit a TODO"
        fnForClose={() => setTodoForEdit({} as ITodo)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input type="text" {...register("title")} />
          <ErrorMessage msg={errors.title?.message as string} />
          <Textarea {...register("description")} />
          <ErrorMessage msg={errors.description?.message as string} />

          <div className="flex items-center gap-2">
            <Button className="px-5">Update</Button>
            <Button
              type="button"
              onClick={closeEditModal}
              className="px-5"
              variant={"cancel"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
