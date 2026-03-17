import { Metadata } from "next";
import IssueFormPageView from "../_components/ClientOnlyIssueForm";


const NewIssuePage = () => {

  return (
    <IssueFormPageView/>
  )
}

export const metadata: Metadata = {
  title: "New Issue | Issue Tracky",
  description: "Create a new issue here",
};

export default NewIssuePage
