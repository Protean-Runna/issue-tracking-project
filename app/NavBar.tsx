"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosBulb } from "react-icons/io";

const NavBar = () => {
  return (
    <nav
      style={{ backgroundColor: "var(--gray-2)" }}
      className="mb-5 py-3 px-5 border-b"
    >
      {" "}
      <Container size={"4"}>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <IoIosBulb size={"20px"} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton>Login</Skeleton>;
  if (status === "unauthenticated")
    return (
      <Button variant='outline' asChild>
        <Link className="nav-link" href="/api/auth/signin">
          Login
        </Link>
      </Button>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            radius="full"
            size={"2"}
            src={session!.user!.image!}
            fallback="?"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"3"}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const links = [
    { label: "About", href: "/about" },
    { label: "Issues", href: "/issues/list" },
    { label: "Dashboard", href: "/dashboard" },
  ];
  const currentPath = usePathname();
  console.log(currentPath);


  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={`
               nav-link
                ${link.href === currentPath && "text-orange-500!"}`}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
