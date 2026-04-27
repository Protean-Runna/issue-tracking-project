import { Heading, Flex, Grid, Card } from "@radix-ui/themes";
import prisma from "@/lib/db";
import { SummaryIssues, IssueChart, LatestIssues } from "./_components";
import { Metadata } from "next";
import { auth } from "@/auth";
import AssignedIssues, { AssignedQuery } from "./_components/AssignedIssues";

interface Props {
    searchParams: AssignedQuery,
}


export default async function dashboard({searchParams}: Props) {
  
  const session = await auth();
  const params = await searchParams;
  const statusGroups = await prisma.issue.groupBy({
  by: ['status'],
  _count: {
    status: true,
    assignedToUserId: true,
  },
  });


  const total = statusGroups.reduce((sum, g) => sum + g._count.status, 0);
  const assigned = statusGroups.reduce((sum, g) => sum + g._count.assignedToUserId, 0);
  const issueCounts = {
    open: statusGroups.find(g => g.status === 'OPEN')?._count.status || 0,
    inProgress: statusGroups.find(g => g.status === 'IN_PROGRESS')?._count.status || 0,
    closed: statusGroups.find(g => g.status === 'CLOSED')?._count.status || 0,
    total,
  };
  const assignedCounts ={
    unAssigned: total - assigned,
    assigned
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Heading as="h1" size="9" mb={"4"}>Dashboard</Heading>
      {session ? <AssignedIssues searchParams={params}/> : 
      <Card>
        <Heading align={'center'} size={'4'}>
          Log in to see your assigned issues
        </Heading>
      </Card> 
      }
      <Grid gap={"3"} className="mt-3" columns={{initial:"1", md:"2"}}>
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

export const dynamic = 'force-dynamic';