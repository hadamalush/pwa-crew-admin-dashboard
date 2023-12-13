import { useForm } from "react-hook-form";
import InputText from "../../UI/Input/InputText";
import TextEditor from "../Editor/TextEditor";
import SettingsTool from "./SettingsDatabase";
import { ComponentPropsWithoutRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";

type AdditionalInfoType = {
  onClose: () => void;
} & ComponentPropsWithoutRef<"form">;

const AdditionalInfo = ({ onClose: closeModal, ...props }: AdditionalInfoType) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [text, setText] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleChangeAdditionalInfo = async () => {
    const title = getValues("title");

    if (!title) return;

    try {
      const res = await axiosPrivate.post("/admin/settings/additionalInfo", { text, title });

      if (res.status === 200) {
        toast.success("Added a message on the home page");
        closeModal();
        return;
      }
      toast.error("Something went wrong");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleChangeAdditionalInfo)} {...props}>
      <SettingsTool
        title="Set startup information, which will appear on the homepage. "
        className="px-10"
      >
        <div className="bg-transparent mx-6 overflow-hidden mt-6 mb-6 w-full ">
          <InputText
            id="title"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 4, message: "At least 4 characters" },
            })}
            aria-label="Title"
            placeholder="Title"
            errors={errors}
          />
        </div>

        <TextEditor onChange={setText} className="!p-0 mb-2 mt-4" />
      </SettingsTool>
    </form>
  );
};

export default AdditionalInfo;
