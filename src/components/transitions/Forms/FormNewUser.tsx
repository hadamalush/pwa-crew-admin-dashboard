import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputText from "../../UI/Input/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { newUserSchema } from "../../../schemas/schema";
import { toast } from "sonner";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { addUser } from "../../../global/user-slice";
import { useGlobalDispatch } from "../../../global/hooks";
import { type ComponentPropsWithoutRef } from "react";

type FormNewUserProps = {
  onClose: () => void;
} & ComponentPropsWithoutRef<"form">;

const FormNewUser = ({ onClose: closeModal, ...props }: FormNewUserProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newUserSchema), mode: "onBlur" });
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useGlobalDispatch();

  const handleCreateUser = async () => {
    const username = getValues("username");
    const email = getValues("email");
    const pass = getValues("password");

    if (!username || !email || !pass) return;

    try {
      const res = await axiosPrivate.post("/admin/users/addUser", {
        username,
        email,
        pass,
      });

      if (res.status === 200) {
        const { createAt, userId } = res.data;

        const newUser = {
          id: userId,
          createAt,
          username,
          isActivated: false,
          newsletter: false,
          email,
        };

        dispatch(addUser({ user: newUser }));
        closeModal();
        document.body.classList.remove("bodyhidden");
        toast.success("User added");
        return;
      }
      toast.warning("Something went wrong");
    } catch (err) {
      toast.warning("Something went wrong");
    }
  };

  return (
    <form className="py-14 px-20 h-160" onSubmit={handleSubmit(handleCreateUser)} {...props}>
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
