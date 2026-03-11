import { Flex, Skeleton, Heading, Container, Table, Button, Text, Link, Badge } from "@radix-ui/themes";

export default function LoadingState() {
    const issues = [1,2,3,4,5,6,7,8];
    return (
    <div className="min-h-screen">
      <Flex minHeight="100px" justify={"center"} mt={"3"}>
        <Heading as="h1" size="9">
          Issues
        </Heading>
      </Flex>
      <Container>
        <Table.Root variant="surface" size={"2"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <Skeleton loading={true}>
                    <Button disabled={true} asChild>
                        <Link underline="none" size={"2"}>
                           New Issue
                        </Link>
                    </Button>
                </Skeleton>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              
              <Table.Row key={issue}>
                <Table.RowHeaderCell>
                  <Text><Skeleton>testing with types</Skeleton></Text>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton><Badge size={"2"}>Status</Badge></Skeleton>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton><Text>Tue Mar 10 2026</Text></Skeleton>
                </Table.Cell>
                <Table.Cell justify={"start"}>
                  <Button asChild variant="outline" mr={"1"}>
                    <Skeleton>Edit</Skeleton>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </div>
  );
    
}