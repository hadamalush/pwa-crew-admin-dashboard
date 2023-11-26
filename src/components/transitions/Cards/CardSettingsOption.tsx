import Container from "../../UI/Container";
import Heading from "../../UI/Heading";
import Icon from "../../UI/Icons/Icon";
import { type IconNameType } from "../../UI/Icons/IconBase";
import { type basicVariantColorType } from "../../variants/variants";
import { type ComponentPropsWithoutRef } from "react";

type CardSettingsOptionType = {
  iconName: IconNameType;
  iconColor: basicVariantColorType;
  title: string;
  text: string;
} & ComponentPropsWithoutRef<"button">;

const CardSettingsOption = ({
  iconName,
  iconColor,
  title,
  text,
  ...props
}: CardSettingsOptionType) => {
  return (
    <Container
      as="button"
      variant="default"
      className="w-full  rounded-lg flex-col p-14 h-auto hover:dark:bg-navItemActive hover:bg-sky-100 sm:w-2/5 duration-300"
      {...props}
    >
      <Icon iconName={iconName} color={iconColor} className="mb-10" />
      <Heading as="h3" className="text-3xl font-semibold text-black dark:text-white">
        {title}
      </Heading>
      <p className="pt-2 text-black dark:text-white">{text}</p>
    </Container>
  );
};

export default CardSettingsOption;
