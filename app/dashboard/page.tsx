import { Box, Card, Heading, Flex, Grid, Text } from "@radix-ui/themes";
import prisma from "@/lib/db";

export default async function dashboard() {
  const issueCounts = {
    open: await prisma.issue.count({ where: { status: "OPEN" } }),
    inProgress: await prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    closed: await prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
  };
  // TO DO: In the future, we'll need some more stuff, like a chart and a way to show recent issues
  return (
    <div className="min-h-screen flex flex-col">
      <Heading as="h1" size="9">Dashboard</Heading>
      <Heading as="h2" size={"7"}> Current Issues</Heading>
      <Grid gap={"3"} columns={"3"}>
        <Card>
          <Heading as="h3" size={"5"}>Open</Heading>
          <Text size={"2"}>{issueCounts.open}</Text>
        </Card>
        <Card>
          <Heading as="h3" size={"5"}>In Progress</Heading>
          <Text size={"2"}>{issueCounts.inProgress}</Text>
        </Card>
        <Card>
          <Heading as="h3" size={"5"}>Closed</Heading>
          <Text size={"2"}>{issueCounts.closed}</Text>
        </Card>
      </Grid>
    </div>
  );
}
