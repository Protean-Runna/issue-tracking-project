import { notFound } from "next/navigation";
import { ISSUES_AXIOS } from "@/app/services/apiResourceFactory";
import { Flex, Container } from "@radix-ui/themes";
import delay from "delay";
import IssueData from "./IssueData";
interface Props {
  params: { id: string };
}

const issueDetailsPage = async ({ params }: Props) => {
  // Commented out do to some funky interactions with the api
  //
  const { id } = await params;
  const res = await ISSUES_AXIOS.getSingle(id);

  if (!res) {
    return notFound();
  }
  await delay(1000);

  const issue = res.data;

  return (
    <Flex justify={"center"} align={"center"}>
      <Container size={"3"}>
        <IssueData issue={issue} />
      </Container>
    </Flex>
  );
};

export default issueDetailsPage;
