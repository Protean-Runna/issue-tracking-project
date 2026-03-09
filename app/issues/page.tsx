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
import { issuesAxios } from "../services/apiIssues";
import { STATUS_COLOURS } from "@/lib/Constants/Status";
import { Status } from "../generated/prisma/enums";
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

  const StatusColour =  STATUS_COLOURS || 'white';

  return (
    <div className="min-h-screen">
      <Box minHeight="100px">
        <Heading as="h1" size="9">
          Issues
        </Heading>
      </Box>
      <Flex gap="3" minHeight="50px">
        <Button asChild>
          <Link href="/issues/new" className="p-1">
            New Issue
          </Link>
        </Button>
      </Flex>
      <Container>
        <Table.Root variant="surface" size={"2"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Text color={StatusColour[issue.status as Status]}>{issue.status} </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{issue.createdAt}</Text>
                </Table.Cell>
                <Table.Cell justify={"start"}>
                  <Button asChild>
                    <Link href="#">Edit</Link>
                  </Button>
                  <Button color="red" asChild>
                    <Link href="#">Delete</Link>
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
