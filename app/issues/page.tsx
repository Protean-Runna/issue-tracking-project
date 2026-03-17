import { Heading, Flex } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import delay from "delay";
import StatusFilter from "./_components/StatusFilter";
import { Status } from "../generated/prisma/enums";
import prisma from "@/lib/db";
interface Props {
  searchParams: Promise<{status: Status}>
}

 const issues = async ({searchParams}: Props) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;
  console.log(status);
  
  const issues = await prisma.issue.findMany({
        select:{
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true
        },
        where: {status},
        orderBy: {createdAt: 'desc'},
    });
  
  await delay(1000);

  return (
    <div className="min-h-screen">
      <Flex minHeight="100px" mt={"3"}>
        <Heading as="h1" size="9">
          Issues
        </Heading>
      </Flex>
      <StatusFilter/>
        
      <IssuesTable issues={issues} />
    </div>
  );
};

export default issues
export const dynamic = 'force-dynamic';

