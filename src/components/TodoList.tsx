import { useEffect } from "react";
import { getTodoList } from "../services";
import Button from "./ui/Button";

const TodoList = () => {
  useEffect(() => {
    (async () => {
      try {
        const data = await getTodoList();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="space-y-1 ">
      <div className="flex items-center justify-between p-3 duration-300 rounded-md hover:bg-gray-100 even:bg-gray-100">
        <p className="w-full font-semibold">1 - First Todo</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"}>Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
