import { notFound } from "next/navigation";
import { Flex, Container } from "@radix-ui/themes";
import delay from "delay";
import IssueData from "./IssueData";
import prisma from "@/lib/db";
interface Props {
  params: { id: string };
}

const issueDetailsPage = async ({ params }: Props) => {
  // So I don't really need to do api calls when it's running on it's own server.
  //
  
  const { id } = await params;
  
  const issueId = parseInt(id);
  if (isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) notFound();
    await delay(1000);
    
    return (
      <Flex justify={"center"} align={"center"} className="w-full">
        <Container size={"3"} className="min-w-0 w-full">
          <IssueData issue={issue} />
        </Container>
      </Flex>
    );

    
};

export default issueDetailsPage;
