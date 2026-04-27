import { StatusBadge } from "@/app/components";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Flex, Heading, Table,Text , Card, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import { Pagination } from "@/app/components/Pagination";
export interface AssignedQuery {
    page: string,
}

interface Props {
    searchParams: AssignedQuery,
}
// TO DO: ACCORDION TIME
const AssignedIssues = async ({searchParams}: Props) => {
    const params = await searchParams;
    const session = await auth();
    const userId = session?.user?.id; // For Find many
    const user = session?.user; // For counts
    const pageSize = 5;
    const page = parseInt(params.page) || 1;
    const issueCount = await prisma.issue.count({where: {assignedToUser: user}})
    const issues = await prisma.issue.findMany({
        where:{
            assignedToUserId: userId
        },
        orderBy: {updatedAt:'desc'},
        take:pageSize,
        skip: (page - 1 ) * pageSize,
        include:{
            assignedToUser:true
        }
    })

    return (
        <Card>
            <details >
            <summary className="cursor-pointer">
                <Text size="4" ><strong>Your Assigned Issues</strong></Text>
            </summary>
            <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
            { pageSize > 0 ?

                <Table.Root >
                    
                    <Table.Body>
                    
                        {issues.map( issue => (
                            <Table.Row key={issue.id}>
                                <Table.Cell>
                                    <Flex justify={'between'} align={'center'}>
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <StatusBadge dbStatus={issue.status} />
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            : <Text align={'center'}>You have no Assigned Issues</Text>
            }
            </details>
        </Card>
    )
};

export default AssignedIssues;