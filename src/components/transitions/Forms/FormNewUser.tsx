import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputText from "../../UI/Input/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { newUserSchema } from "../../../schemas/schema";

const FormNewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newUserSchema), mode: "onBlur" });

  const handleCreateUser = () => {
    console.log("gooo");
  };

  return (
    <form className="py-14 px-20 h-160" onSubmit={handleSubmit(handleCreateUser)}>
      <InputText id="username" label="Username *" errors={errors} {...register("username")} />
      <InputText id="email" label="Email *" errors={errors} {...register("email")} />
      <InputText id="password" label="Password *" errors={errors} {...register("password")} />
      <Button variant="default" size="big" className="mt-14 w-full" type="submit">
        Create
      </Button>
    </form>
  );
};

export default FormNewUser;
