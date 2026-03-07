import Link from "next/link";
import { Heading, Button, Text, Card, Flex, Box } from "@radix-ui/themes";
import prisma from "@/lib/db";
export default async function issues(){
    const issues = await prisma.issue.findMany();



    return (
        <div className="min-h-screen ">
            <Box minHeight="100px">
                <Heading as="h1" size="9">Issues</Heading> 
            </Box>
            <Flex gap="3">
                <Text size="6"> Current Issues</Text>
                <Button><Link  href='/issues/new'>New Issue</Link></Button>
            </Flex>
            <ul className="flex flex-col gap-3">
                {issues.map((i) =>(
                    <li className="" key={i.id}>
                        <Box maxWidth="450px">
                            <Card size="2" >
                                <Flex gap="3" align="center">
                                    <Box>
                                        <Text as="div">{i.title}</Text>
                                        
                                        <Text as="div">{i.description}</Text>
                                        <Text as="div" color="red">{i.status}</Text>
                                    </Box>
                                </Flex>
                            </Card>
                        </Box>
                        
                    </li>
                ))}
            </ul>

        </div>


    );
}