export interface IFormInputLogin {
  email: string;
  password: string;
}

export interface IFormInputRegister extends IFormInputLogin {
  username: string;
  confirmPassword: string;
}

export interface IRegisterForm {
  name: "username" | "email" | "password" | "confirmPassword";
  type: "text" | "email" | "password";
  placeholder: string;
}
export interface ILoginForm {
  name: "email" | "password";
  type: "email" | "password";
  placeholder: string;
}
