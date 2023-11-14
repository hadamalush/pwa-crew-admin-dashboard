import Container from "../components/UI/Container";
import Icon from "../components/UI/Icons/Icon";
import Avatar from "../components/transitions/Avatar";
import { basicVariant } from "../components/variants/variants";
import { cn } from "../util/utils";
import { type MouseEvent } from "react";

const InboxPage = () => {
  const handleCheckbox = (e: MouseEvent<HTMLInputElement>) => {
    const messageId = e.target.id;

    console.log(messageId);
  };

  return (
    <Container variant="wrapper" as="section" className="p-0 md:p-10 ">
      <ul
        className={cn(
          basicVariant({ box: "default" }),
          "w-full h-screen rounded-none md:rounded-xl"
        )}
      >
        <li
          className="flex w-full mx-auto  text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
         md:py-3 md:px-10"
        >
          <input type="checkbox" id="d1" onClick={(e) => handleCheckbox(e)} />
          <Icon
            iconName="star"
            size="s1"
            color="gray"
            className=" mx-5 hidden md:block self-center"
          />
          <Avatar src="/woman.webp" size="s2" className="hidden md:block self-center" />
          <Container
            as="div"
            className="w-9/12 xs:w-10/12 md:w-9/12 xlg:w-10/12 xxl:w-11/12 flex-col p-5 items-start"
          >
            <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              Joaana Misterszejkddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </p>
            <Container as="div" className="w-full">
              <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quia aliquid
                deserunt dolores in officiis doloremque molestiae nihil. Amet, ducimus.
              </p>
            </Container>
          </Container>
          <Container as="div" className="flex-col mx-auto">
            <time>18 Oct</time>
            <Icon iconName="star" size="s1" color="gray" className=" mt-2 md:hidden" />
          </Container>
        </li>
        <li
          className="flex w-full mx-auto  text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
         md:py-3 md:px-10"
        >
          <input type="checkbox" />
          <Icon
            iconName="star"
            size="s1"
            color="gray"
            className=" mx-5 hidden md:block self-center"
          />
          <Avatar src="/woman.webp" size="s2" className="hidden md:block self-center" />
          <Container
            as="div"
            className="w-9/12 xs:w-10/12 md:w-9/12 xlg:w-10/12 xxl:w-11/12 flex-col p-5 items-start"
          >
            <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              Joaana Misterszejkddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </p>
            <Container as="div" className="w-full">
              <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quia aliquid
                deserunt dolores in officiis doloremque molestiae nihil. Amet, ducimus.
              </p>
            </Container>
          </Container>
          <Container as="div" className="flex-col mx-auto">
            <time>18 Oct</time>
            <Icon iconName="star" size="s1" color="gray" className=" mt-2 md:hidden" />
          </Container>
        </li>
        <li
          className="flex w-full mx-auto  text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
         md:py-3 md:px-10"
        >
          <input type="checkbox" />
          <Icon
            iconName="star"
            size="s1"
            color="gray"
            className=" mx-5 hidden md:block self-center"
          />
          <Avatar src="/woman.webp" size="s2" className="hidden md:block self-center" />
          <Container
            as="div"
            className="w-9/12 xs:w-10/12 md:w-9/12 xlg:w-10/12 xxl:w-11/12 flex-col p-5 items-start"
          >
            <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              Joaana Misterszejkddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </p>
            <Container as="div" className="w-full">
              <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quia aliquid
                deserunt dolores in officiis doloremque molestiae nihil. Amet, ducimus.
              </p>
            </Container>
          </Container>
          <Container as="div" className="flex-col mx-auto">
            <time>18 Oct</time>
            <Icon iconName="star" size="s1" color="gray" className=" mt-2 md:hidden" />
          </Container>
        </li>
        <li
          className="flex w-full mx-auto  text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
         md:py-3 md:px-10"
        >
          <input type="checkbox" />
          <Icon
            iconName="star"
            size="s1"
            color="gray"
            className=" mx-5 hidden md:block self-center"
          />
          <Avatar src="/woman.webp" size="s2" className="hidden md:block self-center" />
          <Container
            as="div"
            className="w-9/12 xs:w-10/12 md:w-9/12 xlg:w-10/12 xxl:w-11/12 flex-col p-5 items-start"
          >
            <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              Joaana Misterszejkddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </p>
            <Container as="div" className="w-full">
              <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quia aliquid
                deserunt dolores in officiis doloremque molestiae nihil. Amet, ducimus.
              </p>
            </Container>
          </Container>
          <Container as="div" className="flex-col mx-auto">
            <time>18 Oct</time>
            <Icon iconName="star" size="s1" color="gray" className=" mt-2 md:hidden" />
          </Container>
        </li>
      </ul>
    </Container>
  );
};

export default InboxPage;
