import * as Yup from "yup";
import { IFormInputLogin, IFormInputRegister, ITodoForm } from "../interfaces";

export const validationRegisterSchema: Yup.ObjectSchema<IFormInputRegister> =
  Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(5, "a least 5 characters"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/i,
        "Please enter a valid email"
      ),
    password: Yup.string()
      .required("Passowrd is required")
      .matches(
        /(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*[0-9]{3,})(?=.*[@$%#]{1,})[a-zA-Z\d@$%#]{8,}/,
        "Please enter a valid password"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Confirm passwords not matched password"
    ),
  });

export const validationLoginSchema: Yup.ObjectSchema<IFormInputLogin> =
  Yup.object().shape({
    identifier: Yup.string().required("Username is required"),
    password: Yup.string().required("Passowrd is required"),
  });

export const validationTodoSchema: Yup.ObjectSchema<ITodoForm> =
  Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "a least 5 characters"),
    description: Yup.string()
      .required("Passowrd is required")
      .min(10, "a least 10 characters"),
  });
