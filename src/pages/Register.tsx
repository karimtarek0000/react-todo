import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input";
import { registerInput } from "../data/form";
import { IFormInputRegister } from "../interfaces";
import { validationRegisterSchema } from "../validations/form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputRegister>({
    resolver: yupResolver(validationRegisterSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInputRegister> = (data) =>
    console.log(data);

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

        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
