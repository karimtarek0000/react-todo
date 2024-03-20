import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "../context";
import Button from "./ui/Button";

const Navbar = () => {
  const { userData } = useContext(Auth);

  // ----------------- HANDLER -----------------
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.reload();
  };

  return (
    <nav className="px-3 py-5 mx-auto mb-20 rounded-md mt-7">
      <ul className="flex items-center justify-between">
        <li className="text-2xl font-bold text-blue-700 duration-200">
          <NavLink to="/">TODO</NavLink>
        </li>
        {!userData.jwt ? (
          <div className="flex items-center space-x-3">
            <NavLink
              to="/register"
              className="px-4 py-2 text-lg font-semibold text-white duration-200 bg-indigo-600 rounded-md"
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className="px-4 py-2 text-lg font-semibold text-white duration-200 bg-indigo-600 rounded-md "
            >
              Login
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <li className="text-lg font-semibold duration-200 text-blue-950">
              {userData.user.email}
            </li>

            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
