import { notFound } from "next/navigation";
import IssueFormPageView from "@/app/issues/_components/ClientOnlyIssueForm";
import { ISSUES_AXIOS } from "@/app/services/apiResourceFactory";
import delay from "delay";
interface Props {
    params: {id:string}
}

const EditPage =  async ({params}: Props) => {
    const { id } = await params;
    const res = await ISSUES_AXIOS.getSingle(id);
  
    if (!res) {
      return notFound();
    }
    await delay(1000);

    const issue = res.data;
    return (
        <div>
            <IssueFormPageView issue={issue}/>
        </div>

    );
}


export default EditPage;