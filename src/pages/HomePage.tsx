import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import InputText from "../components/UI/Input/InputText";
import { cn } from "../util/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/schema";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config/config";
import Cookies from "js-cookie";
import { useGlobalDispatch, useGlobalSelector } from "../global/hooks";
import { setAuth } from "../global/auth-slice";
import { redirect, useNavigate } from "react-router-dom";
import { setLoading } from "../global/toggle-slice";
import CircleLoader from "../components/UI/Loader/CircleLoader";
import { toast } from "sonner";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onBlur" });
  const dispatch = useGlobalDispatch();
  const navigate = useNavigate();
  const isLoading = useGlobalSelector((state) => state.toggle.isLoading);

  const backgroundImgClass = `
     ss:bg-[url('/background/mountain-ss.webp')]
     md:bg-[url('/background/mountain-md.webp')]
     lg:bg-[url('/background/mountain-xlg.webp')]
     xl:bg-[url('/background/mountain-xl.webp')]
     xxl:bg-[url('/background/mountain-xxl.webp')]`;

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    dispatch(setLoading({ loading: true }));
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/admin/auth`,
        withCredentials: true,
        data: {
          email,
          password,
        },
        responseType: "json",
      });

      const data = await response.data;

      if (data && data.accessToken && data.refreshToken) {
        const { refreshToken, accessToken, avatar, email, username } = data;

        Cookies.set("accessToken", accessToken, { expires: 7, secure: true });
        Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
        dispatch(setAuth({ authData: { accessToken: refreshToken, avatar, email, username } }));

        toast.success("Successfully logged in");
        dispatch(setLoading({ loading: false }));
        return navigate("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError;
      dispatch(setLoading({ loading: false }));
      const message = (error.response?.data as AxiosError)?.message;

      if (message) {
        toast.error(message);
        return;
      }
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <>
      {isLoading && <CircleLoader className="right-10 bottom-10 !border-sky-500" />}
      <main
        className={cn(
          "w-screen h-screen bg-black flex items-center justify-center  bg-center	bg-cover landscape:items-start landscape:h-160 landscape:sm:items-center landscape:sm:h-screen",
          backgroundImgClass
        )}
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-primary w-full h-full  p-5 ss:w-160 ss:h-160 ss:p-20 ss:rounded-lg landscape:h-auto landscape:sm:h-160"
        >
          <Heading as="h1" className="text-5xl text-white mt-[20%] ss:mt-[10%]">
            Login
          </Heading>
          <InputText
            id="email"
            {...register("email")}
            errors={errors}
            label="Email address *"
            type="email"
            labelClass="text-white "
            className="bg-grayInputDark border-grayInputDark text-white "
          />
          <InputText
            id="password"
            {...register("password")}
            errors={errors}
            label="Password *"
            labelClass="text-white "
            type="password"
            className="bg-grayInputDark border-grayInputDark text-white"
          />

          <Button
            variant="default"
            className={`w-full relative  mt-10  flex items-center justify-center`}
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </main>
    </>
  );
};

export default HomePage;

const VerifyRfToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  let access: boolean = false;

  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/admin/auth/refreshToken`,
      withCredentials: true,
      data: {
        token: refreshToken,
      },
      responseType: "json",
    });

    const data = await response.data;

    if (data) {
      access = true;
    }
  } catch (err: unknown) {
    access = false;
  }

  return access;
};

export const loader = async () => {
  const refreshToken = Cookies.get("refreshToken");
  let isAccess = false;
  if (refreshToken) {
    isAccess = await VerifyRfToken();
  }

  if (!isAccess) return null;
  return redirect("/dashboard");
};
