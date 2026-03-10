
import {
  Heading,
  Button,
  Text,
  Flex,
  Box,
  Table,
  Container,
} from "@radix-ui/themes";
import delay from "delay";
import { StatusBadge } from "../components/statusBadge";
import { issuesAxios } from "../services/apiIssues";
import Link from "@/app/components/Link";

export default async function issues() {


  const res = await issuesAxios.getAll();
  await delay(2000);
  const issues = res.data;
 

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
                <Button asChild>
                  <Link href="/issues/new" underline="none" size={"2"}>
                    New Issue
                  </Link>
                </Button>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  </Link>
                  <div className="block md:hidden">
                    <StatusBadge dbStatus={issue.status}/>
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <StatusBadge dbStatus={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Text>{issue.createdAt}</Text>
                </Table.Cell>
                <Table.Cell justify={"start"}>
                  <Button asChild variant="outline" mr={"1"}>
                    <Link href="#" underline="none">Edit</Link>
                  </Button>
                  <Button asChild > 
                    <Link color="red" underline="none" href="#" ml={"1"}>Delete</Link>
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
