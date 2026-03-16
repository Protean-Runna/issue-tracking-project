import { notFound } from "next/navigation";
import { ISSUES_AXIOS } from "@/app/services/apiResourceFactory";
import { Flex, Container } from "@radix-ui/themes";
import delay from "delay";
import IssueData from "./IssueData";
import axios from "axios";
interface Props {
  params: { id: string };
}

const issueDetailsPage = async ({ params }: Props) => {
  // Commented out do to some funky interactions with the api
  //
  const { id } = await params;
  await delay(1000);
  try {
    const res = await ISSUES_AXIOS.getSingle(id);
    await delay(1000);

    const issue = res.data;

    return (
      <Flex justify={"center"} align={"center"} className="w-full">
        <Container size={"3"} className="min-w-0 w-full">
          <IssueData issue={issue} />
        </Container>
      </Flex>
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }
    throw error;
  }
};

export default issueDetailsPage;
