import { toast } from "sonner";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import Button from "../../UI/Button";
import { useGlobalDispatch } from "../../../global/hooks";
import { deleteUser } from "../../../global/user-slice";

type UserDeletionConfirmationProps = {
  initialData: {
    id: string;
    username: string;
  };
  onClose: () => void;
};

const UserDeletionConfirmation = ({
  initialData,
  onClose: closeModal,
}: UserDeletionConfirmationProps) => {
  const { id, username } = initialData;
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useGlobalDispatch();

  const handleDeleteUser = async () => {
    try {
      const res = await axiosPrivate.post("/admin/users/deleteUser", {
        id,
      });

      if (res.status === 200) {
        dispatch(deleteUser({ userId: id }));
        closeModal();
        document.body.classList.remove("bodyhidden");
        toast.success("User deleted");
        return;
      }
      toast.warning("Something went wrong");
    } catch (err) {
      toast.warning("Something went wrong");
    }
  };

  return (
    <div className="py-14 px-20">
      <h3 className="text-black dark:text-white text-3xl font-semibold text-center">
        Are you sure you want to delete a user?
      </h3>
      <p className="text-center text-black dark:text-white pt-2">
        Username: <strong className="text-lightRed">{username}</strong>
      </p>
      <Button
        variant="default"
        size="big"
        className="mt-14 w-full"
        type="button"
        onClick={handleDeleteUser}
      >
        Delete
      </Button>
    </div>
  );
};

export default UserDeletionConfirmation;
