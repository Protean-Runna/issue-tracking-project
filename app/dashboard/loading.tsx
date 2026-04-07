import { Flex, Skeleton, Heading,Table, Text, Grid, Card, Badge, Avatar } from "@radix-ui/themes";
import { IssueChart, SummaryIssues } from "./_components";

export default function LoadingState() {
    const issues = [1,2,3,4,5,];
    return (
    <div className="min-h-screen flex flex-col">
      <Heading as="h1" size="9" mb={"4"}>Dashboard</Heading>
      <Grid gap={"3"} columns={{initial:"1", md:"2"}}>
        <Flex direction={"column"}>
            <SummaryIssues 
            open={0} 
            inProgress={0} 
            closed={0}/>
            <IssueChart 
            open={0} 
            inProgress={0} 
            closed={0}
            unAssigned={0}
            assigned={0}
            total={0}
            />
        </Flex>
        <Card>
            <Heading as="h4" size="4" mb="3">Latest Issues</Heading>
            <Table.Root  >
                <Table.Body >
                    {issues.map( issue => (
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Flex justify={'between'}>
                                    <Flex direction={"column"} align={"start"} gap={"2"}>
                                        <Text><Skeleton>Skeleton of an issue, woop</Skeleton></Text>
                                        <Skeleton><Badge size={"2"}>Status</Badge></Skeleton>
                                    </Flex>
                                </Flex>
                                
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
      </Grid>


      
    </div>
  );
}