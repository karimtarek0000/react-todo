const Todo = () => {
  const render = [1, 2].map(() => {
    return (
      <div
        role="status"
        className="mb-5 space-y-4 bg-gray-100 rounded-md bg-opacity-30 animate-pulse md:p-6"
      >
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col flex-1">
            <div className="h-3 max-w-md bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  });

  return <>{render}</>;
};

export default Todo;
