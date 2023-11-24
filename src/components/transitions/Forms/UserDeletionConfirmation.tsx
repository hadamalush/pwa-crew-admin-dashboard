import Button from "../../UI/Button";

type UserDeletionConfirmationProps = {
  initialData: {
    id: string;
    name: string;
  };
};

const UserDeletionConfirmation = ({ initialData }: UserDeletionConfirmationProps) => {
  const { id, name } = initialData;

  const handleDeleteUser = () => {
    console.log(id);

    //handling user delete
  };

  return (
    <div className="py-14 px-20">
      <h2 className="text-black dark:text-white text-3xl font-semibold text-center">
        Are you sure you want to delete a user?
      </h2>
      <p className="text-center text-black dark:text-white pt-2">
        Username: <strong className="text-lightRed">{name}</strong>
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
