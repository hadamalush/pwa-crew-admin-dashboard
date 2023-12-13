import { useForm } from "react-hook-form";
import SettingsTool from "./SettingsDatabase";
import { ComponentPropsWithoutRef, useReducer } from "react";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";
import SelectSingle from "../../UI/Select/SelectSingle";
import Heading from "../../UI/Heading";
import { ActionMeta } from "react-select";

type SettingsStorageType = {
  onClose: () => void;
} & ComponentPropsWithoutRef<"form">;

type storageType = "cloudinary" | "vercelBlob" | "mega";
type OptionType = { label: string; value: storageType };
const optionsSelect: OptionType[] = [
  { value: "cloudinary", label: "Cloudinary" },
  { value: "vercelBlob", label: "VercelBlob" },
  { value: "mega", label: "Mega" },
];

type stateStorage = {
  upload: storageType;
  download1: storageType;
  download2: storageType;
  download3: storageType;
};

type actionStorage = {
  type: string;
  selectName: keyof stateStorage;
  value: storageType;
};

type actionMetaType = {
  name: keyof stateStorage;
};

const initialStateStorages: stateStorage = {
  upload: "cloudinary",
  download1: "cloudinary",
  download2: "cloudinary",
  download3: "cloudinary",
};

const storageReducer = (state: stateStorage, action: actionStorage): stateStorage => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.selectName]: action.value,
      };
    default:
      return state;
  }
};

const SettingsStorage = ({ onClose: closeModal, ...props }: SettingsStorageType) => {
  const { handleSubmit } = useForm();

  const axiosPrivate = useAxiosPrivate();
  const [storageState, dispatch] = useReducer(storageReducer, initialStateStorages);

  const handleChangeOption = (newValue: unknown, action: ActionMeta<unknown>) => {
    const selectedOption = newValue as OptionType;
    const selectAction = action as actionMetaType;

    dispatch({
      type: "SET_VALUE",
      selectName: selectAction.name,
      value: selectedOption.value,
    });
  };

  const handleChangeStorage = async () => {
    for (const storage in storageState) {
      const storageName = storage as keyof stateStorage;
      if (storageState[storageName]) {
        toast.error("You entered wrong data!");
        return;
      }
    }

    try {
      const res = await axiosPrivate.post("/admin/settings/setStorage");

      console.log(res);
      return;
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
    <form onSubmit={handleSubmit(handleChangeStorage)} {...props} className="relative z-[-10]">
      <SettingsTool
        title="Set startup information, which will appear on the homepage. "
        className="px-10 relative z-[-10] h-[65rem]"
        btnClass="relative z-[-7] w-full"
      >
        <ul className="w-full relative z-[-1]">
          <li className="w-full relative z-10">
            <Heading as="h4" className="dark:text-white text-black ml-1 font-semibold">
              Choose upload storage
            </Heading>
            <p className="dark:text-orangeYellow font-medium text-orange-700 text-xl ml-1 mb-2">
              Recommend: Cloudinary
            </p>
            <SelectSingle
              options={optionsSelect}
              name="upload"
              className="w-full mt-1"
              required
              onChange={handleChangeOption}
            />
          </li>
          <li className="w-full relative z-[-1]">
            <Heading as="h4" className="dark:text-white text-black ml-1 mt-5 font-semibold">
              Choose download storage
            </Heading>
            <p className="dark:text-orangeYellow text-orange-700 text-xl ml-1 font-medium">
              Recommend: 1. Cloudinary 2. Mega 3. VercelBlob
            </p>
            <p className=" ml-1 text-xl  mb-2 text-lightBlue font-medium">
              Set the priority of downloading data , if the first option is not available, it will
              automatically select the next option.
            </p>
            <SelectSingle
              options={optionsSelect}
              name="download1"
              className="w-full mt-1"
              required
              onChange={handleChangeOption}
            />
          </li>
          <li className="w-full relative z-[-2]">
            <SelectSingle
              options={optionsSelect}
              className="w-full"
              name="download2"
              required
              onChange={handleChangeOption}
            />
          </li>
          <li className="w-full relative z-[-3]">
            <SelectSingle
              options={optionsSelect}
              name="download3"
              onChange={handleChangeOption}
              className="w-full"
              required
            />
          </li>
        </ul>
      </SettingsTool>
    </form>
  );
};

export default SettingsStorage;
