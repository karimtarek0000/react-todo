import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Auth } from "../../context";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { userData } = useContext(Auth);
  const { pathname } = useLocation();

  const isAuthPage = ["/login", "/register"].includes(pathname);

  if (!userData.jwt && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (userData.jwt && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
