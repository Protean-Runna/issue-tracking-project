import { Heading, Flex, Container } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import delay from "delay";
import { ISSUES_AXIOS } from "../services/apiResourceFactory";

export default async function issues() {
  const res = await ISSUES_AXIOS.getAll();
  await delay(2000);
  const issues = res.data;

  return (
    <div className="min-h-screen">
      <Flex minHeight="100px" justify={"center"} mt={"3"}>
        <Heading as="h1" size="9">
          Issues
        </Heading>
      </Flex>
        <IssuesTable issues={issues} />
    </div>
  );
};



