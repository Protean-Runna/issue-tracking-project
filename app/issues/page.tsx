"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heading, Button, Text, Card, Flex, Box } from "@radix-ui/themes";
import prisma from "@/lib/db";
import { issuesAxios } from "../services/apiIssues";
import axios from "axios";
export default function issues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
    type Issue = {          // Validated and mapped API side. should be find
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
    <div className="min-h-screen ">
      <Box minHeight="100px">
        <Heading as="h1" size="9">
          Issues
        </Heading>
      </Box>
      <Flex gap="3" minHeight="50px">
        <Text size="6"> Current Issues</Text>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <ul className="flex flex-col gap-3">
        {issues.map((issue) => (
          <li className="" key={issue.id}>
            <Box maxWidth="450px">
              <Card size="2">
                <Flex gap="3" align="center">
                  <Box as="div">
                    <Text as="div">{issue.title}</Text>
                    <Text as="div" color="red">
                      {issue.status}
                    </Text>
                    <Text as="div">{issue.description}</Text>
                    <Text as="div">{issue.createdAt}</Text>
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
