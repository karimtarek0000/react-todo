import { Dispatch, SetStateAction } from "react";

interface IPagination {
  currentPage: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const style = `px-4 py-2 text-white uppercase bg-indigo-600 rounded-md flex items-center justify-center hover:bg-indigo-500 duration-100 disabled:bg-indigo-300`;

const Pagination = ({ currentPage, pageCount, setPage }: IPagination) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h6>
        Page <span className="font-bold">{currentPage}</span> to {""}
        <span className="font-bold">{pageCount}</span>
      </h6>
      <div className="flex items-center justify-center gap-4 bg-indig ">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={style}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          prev
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={() => setPage((prev) => prev + 1)}
          className={style}
        >
          next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
