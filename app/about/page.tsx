import { Metadata } from "next";
import { Text, Heading } from "@radix-ui/themes";
export const metadata: Metadata = {
  title: "About Us | Issue Tracky",
  description: "Little about Page for explaining this project",

};

export default function about() {
  return (
    <div className="flex min-h-screen justify-start items-center flex-col gap-3 ">
      <Heading mt={"5"} as="h1" size={"8"}>
        About this app
      </Heading>

      <Text>
        This is just an issue tracker, developed with Mosh Programming's
        tutorial as a guide. While I had previous experience developing full
        stack for my previous projects, it felt better to start with less
        complexity while I was learning with next.js.
      </Text>
    </div>
  );
}
