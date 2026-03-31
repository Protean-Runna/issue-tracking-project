import { Heading, Flex, Grid, Text } from "@radix-ui/themes";
import prisma from "@/lib/db";
import { SummaryIssues, IssueChart, LatestIssues } from "./_components";
import { Metadata } from "next";

export default async function dashboard() {


  const statusGroups = await prisma.issue.groupBy({
    by: ['status'],
    _count:{
      status:true,
    },
  });

  const aggregations = await prisma.issue.aggregate({
    _count:{
      _all:true,
      assignedToUserId: true,
    }
  })



  const issueCounts = {
    open: statusGroups.find(g => g.status === 'OPEN')?._count.status || 0,
    inProgress: statusGroups.find(g => g.status === 'IN_PROGRESS')?._count.status || 0,
    closed: statusGroups.find(g => g.status === 'CLOSED')?._count.status || 0,
    total: aggregations._count._all,
  };
  const assignedCounts ={
    unAssigned: aggregations._count._all - aggregations._count.assignedToUserId,
    assigned: aggregations._count.assignedToUserId, 
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
            unAssigned={assignedCounts.unAssigned}
            assigned={assignedCounts.assigned}
            total={issueCounts.total}
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
