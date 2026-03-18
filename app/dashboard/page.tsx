import { Heading, Flex, Grid, } from "@radix-ui/themes";
import prisma from "@/lib/db";
import { SummaryIssues, IssueChart, LatestIssues } from "./_components";
import { Metadata } from "next";
export default async function dashboard() {
  const issueCounts = {
    open: await prisma.issue.count({ where: { status: "OPEN" } }),
    inProgress: await prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    closed: await prisma.issue.count({ where: { status: "CLOSED" } }),
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Heading as="h1" size="9" mb={"4"}>Dashboard</Heading>
      <Grid gap={"3"} columns={{initial:"1", md:"2"}}>
        <Flex direction={"column"}>
            <SummaryIssues 
            open={issueCounts.open} 
            inProgress={issueCounts.inProgress} 
            closed={issueCounts.closed}/>
            <IssueChart 
            open={issueCounts.open} 
            inProgress={issueCounts.inProgress} 
            closed={issueCounts.closed}
            />
        </Flex>
        <LatestIssues/>
      </Grid>


      
    </div>
  );
}

export const metadata: Metadata = {
  title: `Dashboard | Issue Tracky`,
  description: "Dashboard for Issue Tracker",
};
