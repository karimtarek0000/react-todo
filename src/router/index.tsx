import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import RootLayout from "../pages/Layout";
import LoginPage from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import TodosPage from "../pages/Todos";

const isLoggedIn = !!localStorage.getItem("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/login">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/">
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="todos"
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/">
              <TodosPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
