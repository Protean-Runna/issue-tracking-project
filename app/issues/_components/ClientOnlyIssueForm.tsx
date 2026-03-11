'use client'
import IssueFormSkeleton from "./IssueFormSkeleton";
import dynamic from "next/dynamic"

const IssueFormPageView = dynamic(() => import("./IssueForm"),
{
    ssr:false,
    loading: () => <IssueFormSkeleton/>
});

export default IssueFormPageView;