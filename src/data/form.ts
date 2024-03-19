import { ILoginForm, IRegisterForm } from "../interfaces";

export const registerInput: IRegisterForm[] = [
  {
    name: "username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
  },
];

export const loginInput: ILoginForm[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];
