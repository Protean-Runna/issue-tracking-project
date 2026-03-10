import NextLink from "next/link";

import { Link as RadixLink } from "@radix-ui/themes";
import { ReactNode, ComponentProps } from "react";

interface Props extends ComponentProps<typeof RadixLink>{
  href: string;
  children: ReactNode;

}

const Link = ({ href, children, ...props }: Props) => {
  return (
    <RadixLink asChild {...props}>
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
};

export default Link;
