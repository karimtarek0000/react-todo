import { useState } from "react";
import Pagination from "../components/ui/Pagination";
import Todo from "../components/ui/skeleton/Todo";
import { useFetchAllTodos } from "../hooks/quires";
import { ITodo } from "../interfaces";

const Todos = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading: loadingTodos } = useFetchAllTodos(page);

  return (
    <>
      <Pagination
        currentPage={data?.meta?.pagination?.page}
        pageCount={data?.meta?.pagination?.pageCount}
        setPage={setPage}
      />

      <div className="mt-7">
        {loadingTodos ? (
          <Todo />
        ) : (
          data.data?.map((todo: { id: number; attributes: ITodo }) => {
            return (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 duration-300 rounded-md hover:bg-gray-100 even:bg-gray-100"
              >
                <p className="w-full font-semibold">{todo.attributes?.title}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Todos;
