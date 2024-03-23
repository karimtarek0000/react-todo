import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddTodo, useDeleteTodo, useEditTodo } from "../hooks/mutations";
import { useFetchTodo } from "../hooks/quires";
import { ITodo, ITodoForm } from "../interfaces";
import { validationTodoSchema } from "../validations/form";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import Todo from "./ui/skeleton/Todo";

const TodoList = () => {
  // ----------------- STATE -----------------
  const modalEdit = useRef<any>();
  const modalConfirm = useRef<any>();
  const modalForAdded = useRef<any>();
  const [idTodo, setIdTodo] = useState<number>(0);

  // ----------------- QUIRES -----------------
  const {
    data,
    isLoading: loadingTodoList,
    isError: errorTodoList,
    refetch: fetchTodoList,
  } = useFetchTodo();

  // ----------------- HANDLER -----------------
  const pickForDeleteHandler = (id: number): void => {
    openModalConfirm();
    setIdTodo(id);
  };
  const pickForEditHandler = (todo: ITodo): void => {
    reset();
    openModalEdit();
    setIdTodo(todo.id);
    setValue("title", todo.title);
    setValue("description", todo.description);
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
  const { mutate: mutateAddTodo, isPending: loadingAddTodo } = useAddTodo(
    () => {
      fetchTodoList();
      closeModalAdded();
    }
  );

  // ----------------- VALIDATION'S -----------------
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ITodoForm>({
    resolver: yupResolver(validationTodoSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<ITodoForm> = (todo: ITodoForm) => {
    idTodo ? mutateEditTodo({ id: idTodo, data: todo }) : mutateAddTodo(todo);
    reset();
  };

  // -- MODALS
  const openModalEdit = (): void => modalEdit.current.openModal();
  const openModalConfirm = (): void => modalConfirm.current.openModal();
  const openModalAdded = (): void => {
    setIdTodo(0);
    modalForAdded.current.openModal();
  };
  const closeModalConfirm = (): void => modalConfirm.current.closeModal();
  const clearInputsForm = (): void => {
    setValue("title", "");
    setValue("description", "");
  };
  const closeEditModal = (): void => {
    clearInputsForm();
    modalEdit.current.closeModal();
  };
  const closeModalAdded = (): void => {
    modalForAdded.current.closeModal();
    reset();
  };

  // Loading
  if (loadingTodoList) return <Todo />;

  // ----------------- RENDERS -----------------
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
    <div className="space-y-1">
      {/* Add new todo */}
      <Button onClick={openModalAdded} className="mb-10 uppercase ms-auto">
        add new<span className="font-bold">TODO</span>
      </Button>

      {renderTodosList.length ? (
        renderTodosList
      ) : (
        <h2 className="text-3xl font-bold text-center text-red-500">
          Not any todo yet 🧐
        </h2>
      )}

      {errorTodoList && (
        <h2 className="text-3xl font-bold text-center text-red-500">
          Something wrong please try again
        </h2>
      )}

      {/* MODAL: Add new TODO */}
      <Modal ref={modalForAdded} title="Add new TODO">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input type="text" {...register("title")} />
          <ErrorMessage msg={errors.title?.message as string} />
          <Textarea {...register("description")} />
          <ErrorMessage msg={errors.description?.message as string} />

          <div className="flex items-center gap-2">
            <Button isLoading={loadingAddTodo} className="px-5">
              Added
            </Button>
            <Button
              type="button"
              onClick={closeModalAdded}
              className="px-5"
              variant={"cancel"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: Edit TODO */}
      <Modal ref={modalEdit} title="Edit a TODO" fnForClose={clearInputsForm}>
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

      {/* MODAL: Confirm for delete TODO */}
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
