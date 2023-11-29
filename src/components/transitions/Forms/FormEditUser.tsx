import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputText from "../../UI/Input/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { newUserSchema } from "../../../schemas/schema";

type FormEditUserProps = {
  id: string;
  name: string;
  email: string;
};

type initialData = {
  initialData: FormEditUserProps;
};

const FormEditUser = ({ initialData }: initialData) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newUserSchema), mode: "onBlur" });
  const { id, name, email } = initialData;

  const handleEditUser = () => {
    console.log(id);
    //hendle user edit...
  };

  return (
    <form className="py-14 px-20 h-160" onSubmit={handleSubmit(handleEditUser)}>
      <InputText
        id="username"
        label="Username *"
        defaultValue={name}
        errors={errors}
        {...register("username")}
      />
      <InputText
        id="email"
        label="Email *"
        defaultValue={email}
        errors={errors}
        {...register("email")}
      />
      <InputText id="password" label="New password *" errors={errors} {...register("password")} />
      <Button variant="default" size="big" className="mt-14 w-full" type="submit">
        Edit
      </Button>
    </form>
  );
};

export default FormEditUser;
