import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <main>
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
      />
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
