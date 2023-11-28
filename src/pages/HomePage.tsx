import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import InputText from "../components/UI/Input/InputText";
import { cn } from "../util/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/schema";
import axios from "axios";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onBlur" });

  const backgroundImgClass = `
     ss:bg-[url('/background/mountain-ss.webp')]
     md:bg-[url('/background/mountain-md.webp')]
     lg:bg-[url('/background/mountain-xlg.webp')]
     xl:bg-[url('/background/mountain-xl.webp')]
     xxl:bg-[url('/background/mountain-xxl.webp')]`;

  const handleCreateUser = async ({ email, password }: { email: string; password: string }) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/admin/auth",
      data: {
        email,
        password,
      },
      responseType: "json",
      headers: config.headers,
    });

    console.log(response);
    // const response = await axios({
    //   method: "post",
    //   url: "http://localhost:3000/api/admin/auth",
    //   data: {
    //     email,
    //     password,
    //   },
    //   responseType: "json",
    // });

    // localStorage.setItem("token", response.data);
  };

  return (
    <main
      className={cn(
        "w-screen h-screen bg-black flex items-center justify-center  bg-center	bg-cover landscape:items-start landscape:h-160 landscape:sm:items-center landscape:sm:h-screen",
        backgroundImgClass
      )}
    >
      <form
        onSubmit={handleSubmit(handleCreateUser)}
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
      </form>
    </main>
  );
};

export default HomePage;
