import { useForm } from "react-hook-form";
import InputText from "../../UI/Input/InputText";
import TextEditor from "../Editor/TextEditor";
import SettingsTool from "./SettingsDatabase";
import { ComponentPropsWithoutRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../../schemas/schema";

type AutomaticMessageType = {
  onClose: () => void;
} & ComponentPropsWithoutRef<"form">;

const AutomaticMessage = ({ onClose: closeModal, ...props }: AutomaticMessageType) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(emailSchema), mode: "onBlur" });
  const [text, setText] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleChangeAutomaticMessage = async () => {
    const email = getValues("email");

    if (!email) return;

    try {
      const res = await axiosPrivate.post("/admin/settings/setAutomaticMessage", { text, email });

      if (res.status === 200) {
        toast.success("New feedback message set");
        closeModal();
        return;
      }
      toast.error("Something went wrong");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleChangeAutomaticMessage)} {...props}>
      <SettingsTool
        title="Set up an automatic message, which will be sent to users, if they use the contact form"
        className="px-10"
      >
        <div className="bg-transparent mx-6 overflow-hidden mt-6 mb-6 w-full ">
          <InputText
            id="email"
            {...register("email")}
            aria-label="Address email"
            placeholder="Enter your address email"
            errors={errors}
          />
        </div>

        <TextEditor onChange={setText} className="!p-0 mb-2 mt-4" />
      </SettingsTool>
    </form>
  );
};

export default AutomaticMessage;
