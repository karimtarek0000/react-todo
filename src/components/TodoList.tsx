import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { ITodo } from "../interfaces";
import { getTodoList } from "../services";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

const TodoList = () => {
  // ----------------- STATE -----------------
  const modal = useRef<any>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  if (isLoading) return <h2>Loading...</h2>;

  // ----------------- HANDLER -----------------
  const openModal = (): void => modal.current.openModal();
  const closeModal = (): void => modal.current.closeModal();

  // ----------------- RENDER -----------------
  const renderTodosList = data.map((todo: ITodo) => {
    return (
      <div
        key={todo.title}
        className="flex items-center justify-between p-3 duration-300 rounded-md hover:bg-gray-100 even:bg-gray-100"
      >
        <p className="w-full font-semibold">{todo.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"} onClick={openModal}>
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

      <Modal ref={modal} title="Edit todo">
        <form>
          <Input type="text" placeholder="Title" />
        </form>

        <div className="flex items-center gap-2 mt-5">
          <Button className="px-5">Update</Button>
          <Button onClick={closeModal} className="px-5" variant={"cancel"}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
