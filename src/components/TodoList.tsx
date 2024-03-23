import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITodo, ITodoForm } from "../interfaces";
import { useDeleteTodo, useEditTodo } from "../server/mutations";
import { useFetchTodo } from "../server/quires";
import { validationTodoSchema } from "../validations/form";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";

const TodoList = () => {
  // ----------------- STATE -----------------
  const modal = useRef<any>();
  const modalConfirm = useRef<any>();
  const [todoForEdit, setTodoForEdit] = useState<ITodo>({} as ITodo);
  const [idTodo, setIdTodo] = useState<number>(0);

  // ----------------- QUIRES -----------------
  const {
    data,
    isLoading: loadingTodoList,
    refetch: fetchTodoList,
  } = useFetchTodo();

  // ----------------- HANDLER -----------------
  // -- MODAL
  const openModal = (): void => modal.current.openModal();
  const openModalConfirm = (): void => modalConfirm.current.openModal();
  const closeModalConfirm = (): void => modalConfirm.current.closeModal();
  const closeEditModal = (): void => {
    setTodoForEdit({} as ITodo);
    modal.current.closeModal();
  };

  const pickForEditHandler = (todo: ITodo): void => {
    openModal();
    setTodoForEdit(todo);
  };
  const pickForDeleteHandler = (id: number): void => {
    openModalConfirm();
    setIdTodo(id);
  };
  const deleteTodoHandler = () => {
    mutateDeleteTodo(idTodo);
  };

  // ----------------- MUTATIONS -----------------
  const { mutate: mutateEditTodo, isPending: loadingEditTodo } = useEditTodo(
    () => {
      fetchTodoList();
      closeEditModal();
    }
  );

  const { mutate: mutateDeleteTodo, isPending: loadingDeleteTodo } =
    useDeleteTodo(() => {
      fetchTodoList();
      closeModalConfirm();
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
    mutateEditTodo({ id: todoForEdit.id, data: todo });

  // To set new data when pick a TODO
  useEffect(() => {
    if (Object.keys(todoForEdit).length) {
      clearErrors();
      setValue("title", todoForEdit.title);
      setValue("description", todoForEdit.description);
    }
  }, [clearErrors, setValue, todoForEdit]);

  // Loading
  if (loadingTodoList) return <h2>Loading...</h2>;

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
          <Button
            onClick={() => pickForDeleteHandler(todo.id)}
            variant={"danger"}
            size={"sm"}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className="space-y-1 ">
      {renderTodosList}

      {/* Edit */}
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
            <Button isLoading={loadingEditTodo} className="px-5">
              Update
            </Button>
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

      {/* Confirm for delete */}
      <Modal
        ref={modalConfirm}
        title="Are you sure you want to remove this Todo from your Store?"
      >
        <div>
          <p className="text-gray-500">
            Deleting this Todo will remove it permanently from your inventory.
            Any associated data, sales history, and other related information
            will also be deleted. Please make sure this is the intended action.
          </p>
          <div className="flex items-center gap-2 mt-5">
            <Button
              onClick={deleteTodoHandler}
              isLoading={loadingDeleteTodo}
              className="px-5"
              variant={"danger"}
            >
              Yes, remove
            </Button>
            <Button
              onClick={closeModalConfirm}
              type="button"
              className="px-5"
              variant={"cancel"}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
