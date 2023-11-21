import { cn } from "../../util/utils";

import { basicVariant, basicVariantSizeType } from "../variants/variants";

type AvatarProps = Pick<HTMLImageElement, "src"> & {
  size: basicVariantSizeType;
  className?: string;
};

const Avatar = ({ size, className, ...props }: AvatarProps) => (
  <picture className="flex">
    <source srcSet={props.src} />
    <img
      {...props}
      alt="Admin avatar"
      className={cn("rounded-full object-cover", basicVariant({ size: size }), className)}
    />
  </picture>
);

export default Avatar;
