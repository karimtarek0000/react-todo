import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input";
import { Auth } from "../context";
import { loginInput } from "../data/form";
import { IError, IFormInputLogin } from "../interfaces";
import { login } from "../services";
import { validationLoginSchema } from "../validations/form";

const LoginPage = () => {
  // ----------------- STATE -----------------
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(Auth);

  // ----------------- HANDLER -----------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputLogin>({
    resolver: yupResolver(validationLoginSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInputLogin> = async (data) => {
    try {
      setIsLoading(true);
      const { data: userData }: any = await login(data);
      auth.setUserData(userData);
      reset();
      toast.success("Login successfully");
    } catch (error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- RENDER -----------------
  const renderInputs = loginInput.map(({ name, type, placeholder }, i) => {
    return (
      <div key={i}>
        <Input type={type} placeholder={placeholder} {...register(name)} />
        <ErrorMessage msg={errors[name]?.message as string} />
      </div>
    );
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">Login to TODO</h2>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderInputs}

        <Button isLoading={isLoading} fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
