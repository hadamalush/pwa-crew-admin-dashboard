import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import InputText from "../components/UI/Input/InputText";
import { cn } from "../util/utils";

const HomePage = () => {
  const backgroundImgClass =
    "ss:bg-[url('/background/mountain-ss.webp')] md:bg-[url('/background/mountain-md.webp')] lg:bg-[url('/background/mountain-xlg.webp')] xl:bg-[url('/background/mountain-xl.webp')]  xxl:bg-[url('/background/mountain-xxl.webp')] ";

  return (
    <main
      className={cn(
        "w-screen h-screen bg-orange-900 flex items-center justify-center  bg-center	bg-cover",
        backgroundImgClass
      )}
    >
      <form className="bg-primary w-full h-full items-center flex-col justify-center flex p-5 ss:w-160 ss:h-160 ss:p-20 ss:rounded-lg ">
        <Heading as="h1" className="text-5xl text-white mr-auto">
          Login
        </Heading>
        <InputText
          id="email"
          label="Email address *"
          labelClass="text-white mr-auto"
          className="bg-grayInputDark border-grayInputDark text-white"
        />
        <InputText
          id="password"
          label="Password *"
          labelClass="text-white mr-auto "
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
