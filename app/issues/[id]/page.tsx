import { notFound } from "next/navigation";
// import { issuesAxios } from "@/app/services/apiIssues";
import {  Flex, Container } from "@radix-ui/themes";
import delay from "delay";
import prisma from "@/lib/db";
import IssueData from "./IssueData";
interface Props {
  params: { id: string };
}

const issueDetailsPage = async ({ params }: Props) => {
/* Commented out do to some funky interactions with the api
  const { id } = await params;
  const res = await issuesAxios.getSingle(id);

  if (!res) {
    return notFound();
  }
    */

  /// THIS IS TEMPORARY UNTIL THE FIND UNIQUE IS FIXED ON THE API
  const {id} = await params;  // await has no effect my foot

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({       
        where : {id: issueId},
    });
  if (!issue) {
    return notFound();
  }
  await delay(1000);

  //const issue = res.data;

  return (
    <Flex justify={"center"} align={"center"}>
      <Container size={"3"}>
        <IssueData issue={issue}/>
      </Container>
    </Flex>
  );
};

export default issueDetailsPage;
