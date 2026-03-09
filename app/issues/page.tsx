"use client";
import { useState, useEffect } from "react";
import {
  Heading,
  Button,
  Text,
  Flex,
  Box,
  Table,
  Link,
  Container,
} from "@radix-ui/themes";
import { StatusBadge } from "../components/statusBadge";
import { issuesAxios } from "../services/apiIssues";
export default function issues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  type Issue = {
    // Validated and mapped API side. should be fine
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  
  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await issuesAxios.getAll();
        //const res = await axios.get('/api/issues');
        setIssues(res.data as Issue[]);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);
  if (loading) return <p>Loading...</p>;

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
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
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
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <StatusBadge dbStatus={issue.status} />
                </Table.Cell>
                <Table.Cell>
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
