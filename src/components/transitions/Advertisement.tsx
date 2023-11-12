import Button from "../UI/Button";
import Container from "../UI/Container";
import Heading from "../UI/Heading";

const Advertisement = () => {
  return (
    <Container
      as="div"
      variant="default"
      className="w-full h-32 bg-[url('/network.webp')] bg-center bg-cover justify-start  relative"
    >
      <img
        src="/laptop1.webp"
        className="absolute left-1 sm:left-40 bottom-2 hidden ss:block ss:w-2/12 sm:w-auto"
      />
      <div className="mxs:pl-5 ss:pl-44 sm:pl-96">
        <Heading as="h3" className="font-bold md:text-3xl text-lg ss:text-xl sm:text-2xl">
          Do you need a computer to work, play or watch ?
        </Heading>
        <p className="text-base  md:text-2xl  ss:text-xl sm:text-2xl">
          Call us , we will offer you the best possible deal.
        </p>
      </div>
      <Button className="ml-auto mr-1 md:mr-40 " variant="pill" size="big">
        Check out
      </Button>
    </Container>
  );
};

export default Advertisement;
