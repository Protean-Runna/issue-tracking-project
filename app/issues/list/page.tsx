import { Heading, Flex } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import StatusFilter from "../_components/StatusFilter";
import { Status } from "@/app/generated/prisma/enums";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { Pagination } from "@/app/components/Pagination";
interface Props {
  searchParams: Promise<{status: Status, page: string}>
}

 const issues = async ({searchParams}: Props) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;
  const where = {status};
  //console.log(status);
  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10
  const issues = await prisma.issue.findMany({
        select:{
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true
        },
        where,
        orderBy: {createdAt: 'desc'},
        skip: (page - 1) * pageSize,
        take: pageSize
    });
  

  const issueCount = await prisma.issue.count({where});


  return (
    <Flex className="min-h-screen" direction={'column'} gap={'2'}>
      <Flex minHeight="100px">
        <Heading as="h1" size="9">
          Issues
        </Heading>
      </Flex>
      <StatusFilter/>
        
      <IssuesTable issues={issues} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount}/>
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issues List | Issue Tracky",
  description: "See all issues here",
};

export default issues
export const dynamic = 'force-dynamic';

