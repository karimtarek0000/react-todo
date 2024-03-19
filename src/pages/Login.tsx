import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input";
import { loginInput } from "../data/form";
import { IFormInputLogin } from "../interfaces";
import { validationLoginSchema } from "../validations/form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputLogin>({
    resolver: yupResolver(validationLoginSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInputLogin> = (data) => console.log(data);

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

        <Button fullWidth>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
