import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/lib/db";
import delay from "delay";
interface Props {
    params: {id:string}
}

const EditPage =  async ({params}: Props) => {
    const {id} = await params;  // await has no effect my foot

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({       
        where : {id: issueId},
    });
    if (!issue) {
        return notFound();
      }
      await delay(1000);
    return (
        <div>
            <p className="">Hello there! This is the Edit page</p>
            <IssueForm issue={issue}/>
        </div>

    );
}


export default EditPage;