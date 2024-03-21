import { createContext, useState } from "react";
import { IAuthContext, IAuthState, IUserData } from "../interfaces";

export const Auth = createContext<IAuthContext>({} as IAuthContext);

const AuthState = ({ children }: IAuthState) => {
  const [userData, setUserData] = useState<IUserData>({} as IUserData);

  if (Object.keys(userData).length && !localStorage.getItem("token")) {
    localStorage.setItem("token", userData.jwt);
    localStorage.setItem("user", JSON.stringify(userData.user));
  }

  if (localStorage.getItem("token") && !Object.keys(userData).length) {
    setUserData(() => ({
      jwt: localStorage.getItem("token") as string,
      user: JSON.parse(localStorage.getItem("user") as string),
    }));
  }

  return (
    <Auth.Provider value={{ userData, setUserData }}>{children}</Auth.Provider>
  );
};

export default AuthState;
