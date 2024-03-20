import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input";
import { Auth } from "../context";
import { registerInput } from "../data/form";
import { IError, IFormInputRegister } from "../interfaces";
import { regsiter } from "../services";
import { validationRegisterSchema } from "../validations/form";

const RegisterPage = () => {
  // ----------------- STATE -----------------
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(Auth);
  const navigate = useNavigate();

  // ----------------- HANDLER -----------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputRegister>({
    resolver: yupResolver(validationRegisterSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInputRegister> = async (data) => {
    try {
      setIsLoading(true);
      const { data: userData }: any = await regsiter(data);
      auth.setUserData(userData);
      reset();
      toast.success(
        "Signup successfully will redirect to home page after 2 seconds"
      );

      setTimeout(() => location.replace("/"), 2000);
    } catch (error) {
      const errorObj = error as AxiosError<IError>;
      toast.error(errorObj.response?.data.error.message as string);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- RENDER -----------------
  const renderInputs = registerInput.map(({ name, type, placeholder }, i) => {
    return (
      <div key={i}>
        <Input type={type} placeholder={placeholder} {...register(name)} />
        <ErrorMessage msg={errors[name]?.message as string} />
      </div>
    );
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Register to TODO
      </h2>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderInputs}

        <Button isLoading={isLoading} fullWidth>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
