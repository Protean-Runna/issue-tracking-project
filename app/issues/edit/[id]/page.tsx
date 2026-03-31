import { notFound } from "next/navigation";
import IssueFormPageView from "@/app/issues/_components/ClientOnlyIssueForm";
import delay from "delay";
import prisma from "@/lib/db";
interface Props {
    params: {id:string}
}

const EditPage =  async ({params}: Props) => {
    const { id } = await params;
    const issueId = parseInt(id);
    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    });
  
    if (!issue) {
      return notFound();
    }
    return (
        <div>
            <IssueFormPageView issue={issue}/>
        </div>

    );
}

export async function generateMetadata({params} : Props) {
  const { id } = await params;
  
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  return {
    title: `Edit Issue: ${issue?.title}`,
    description: `Editing: ${issue?.id}`
  }
};

export default EditPage;