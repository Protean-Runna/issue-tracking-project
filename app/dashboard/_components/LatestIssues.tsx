import { StatusBadge } from "@/app/components";
import prisma from "@/lib/db";
import { Flex, Heading, Table, Card, Avatar } from "@radix-ui/themes";
import Link from "next/link";
const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: {createdAt:'desc'},
        take:5,
        include:{
            assignedToUser:true
        }
    })

    return (
        <Card>
            <Heading as="h4" size="4" mb="3">Latest Issues</Heading>
            <Table.Root >
                <Table.Body>
                    {issues.map( issue => (
                        <Table.Row key={issue.id} className="hover:backdrop-brightness-125">
                            <Table.Cell>
                                <Flex justify={'between'}>
                                    <Flex direction={"column"} align={"start"} gap={"2"}>
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <StatusBadge dbStatus={issue.status} />
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Avatar radius="full" src={issue.assignedToUser.image!} fallback="?" referrerPolicy="no-referrer" />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
};

export default LatestIssues;