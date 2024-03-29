import { Dispatch, ReactNode, SetStateAction } from "react";

// ----------- FORM ----------------
export interface IFormInputLogin {
  identifier: string;
  password: string;
}

export interface IFormInputRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterForm {
  name: "username" | "email" | "password" | "confirmPassword";
  type: "text" | "email" | "password";
  placeholder: string;
}
export interface ILoginForm {
  name: "identifier" | "password";
  type: "email" | "password";
  placeholder: string;
}

export interface ITodoForm {
  title: string;
  description: string;
}
// ---------------
export interface IError {
  error: { message: string };
}

export interface IAuthState {
  children: ReactNode;
}

export interface IUserData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface IAuthContext {
  userData: IUserData;
  setUserData: Dispatch<SetStateAction<IUserData>>;
  logoutHandler: () => void;
}

export interface ITodo {
  title: string;
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
}
