import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputText from "../../UI/Input/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserSchema } from "../../../schemas/schema";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { useGlobalDispatch } from "../../../global/hooks";
import { editUser } from "../../../global/user-slice";
import { toast } from "sonner";

type FormEditUserProps = {
  id: string;
  username: string;
  email: string;
};

type initialData = {
  initialData: FormEditUserProps;
  onClose: () => void;
};

const FormEditUser = ({ initialData, onClose: closeModal }: initialData) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editUserSchema), mode: "onBlur" });
  const { id, username, email } = initialData;
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useGlobalDispatch();

  const handleEditUser = async () => {
    const newUsername = getValues("username");
    const newEmail = getValues("email");
    const newPass = getValues("password");

    if (!newPass && newUsername === username && newEmail === email) return;

    try {
      const res = await axiosPrivate.post("/admin/users/editUser", {
        newUsername,
        newEmail,
        newPass,
        id,
      });

      if (res.status === 200 && newUsername && newEmail) {
        dispatch(editUser({ userId: id, newEmail: newEmail, newUsername: newUsername }));
        closeModal();
        document.body.classList.remove("bodyhidden");
        toast.success("User updated");
        return;
      }
      toast.warning("Something went wrong");
    } catch (err) {
      toast.warning("Something went wrong");
    }
  };

  return (
    <form className="py-14 px-20 h-160" onSubmit={handleSubmit(handleEditUser)}>
      <InputText
        id="username"
        label="Username *"
        defaultValue={username}
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
