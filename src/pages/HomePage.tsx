import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import InputText from "../components/UI/Input/InputText";
import { cn } from "../util/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/schema";
import axios from "axios";
import { API_URL } from "../config/config";
import Cookies from "js-cookie";
import { useGlobalDispatch } from "../global/hooks";
import { setAuth } from "../global/auth-slice";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onBlur" });
  const dispatch = useGlobalDispatch();

  const backgroundImgClass = `
     ss:bg-[url('/background/mountain-ss.webp')]
     md:bg-[url('/background/mountain-md.webp')]
     lg:bg-[url('/background/mountain-xlg.webp')]
     xl:bg-[url('/background/mountain-xl.webp')]
     xxl:bg-[url('/background/mountain-xxl.webp')]`;

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/admin/auth`,
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
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  //tokenRefresh
  const refreshToken = async () => {
    const token = Cookies.get("refreshToken");

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/api/admin/auth/refreshToken",
        data: {
          token: token,
        },
        responseType: "json",
      });

      const data = await response.data;

      if (data) {
        Cookies.set("accessToken", data.accessToken, { expires: 7, secure: true });
        dispatch(setAuth({ authData: data }));
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  //token access
  // const sendToken = async () => {
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "http://localhost:3000/api/admin/addSomething",
  //       data: {
  //         message: "Checking...",
  //       },
  //       responseType: "json",
  //       headers: config.headers,
  //     });

  //     console.log(response);

  //     // const data = await response.data;

  //     // if (data) {
  //     //   localStorage.setItem("token", response.data);
  //     // }
  //   } catch (err: unknown) {
  //     // console.log(err.response.data.message);
  //     console.log(err);
  //   }
  // };

  return (
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

        <Button variant="default" className="w-full mt-10">
          Login
        </Button>
        <Button variant="default" className="w-full mt-10" type="button" onClick={refreshToken}>
          SendToken
        </Button>
      </form>
    </main>
  );
};

export default HomePage;
