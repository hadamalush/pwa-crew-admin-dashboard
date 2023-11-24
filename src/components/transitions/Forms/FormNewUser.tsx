import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputText from "../../UI/Input/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const newUserSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "At least 3 characters")
    .max(80, "Max 80 characters"),
  email: yup
    .string()
    .required("Address email is required")
    .min(3, "At least 3 characters")

    .email("Enter valid address email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'<,>.?/]).{8,}$/,
      "Password must be strong"
    ),
});

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
