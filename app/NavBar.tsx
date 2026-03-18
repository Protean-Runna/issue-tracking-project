"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosBulb } from "react-icons/io";

const NavBar = () => {
  const links = [
    { label: "About", href: "/about" },
    { label: "Issues", href: "/issues" },
    { label: "Dashboard", href: "/dashboard" },
  ];
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log(currentPath);

  return (
    <nav
      style={{ backgroundColor: "var(--black-a10)" }}
      className="mb-5 py-4 px-5 border-b h-14"
    >
      {" "}
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <IoIosBulb size={"20px"} />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={`
                                hover:text-amber-500  
                                transition-colors
                                ${
                                  link.href === currentPath
                                    ? "text-amber-300"
                                    : "text-zinc-50"
                                }`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
