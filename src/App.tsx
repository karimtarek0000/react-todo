import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthState from "./context";
import router from "./router";
import Interceptor from "./server/Interceptor";

const queryClient = new QueryClient();

const App = () => {
  return (
    <main className="container">
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
      />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthState>
          <Interceptor>
            <RouterProvider router={router} />
          </Interceptor>
        </AuthState>
      </QueryClientProvider>
    </main>
  );
};

export default App;
