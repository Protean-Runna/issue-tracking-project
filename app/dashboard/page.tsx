import { Box, Card, Heading, Flex, Grid, Text } from "@radix-ui/themes";
import prisma from "@/lib/db";
import StatCard from "./_components/StatCard";
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
      <Heading as="h2" m={"2"} mb={"4"} mt={"4"} size={"7"}> Current Issues</Heading>
      <Grid gap={"3"} columns={"3"}>
        <StatCard Title={"Open"}>{issueCounts.open}</StatCard>
        <StatCard Title={"In Progress"}>{issueCounts.inProgress}</StatCard>
        <StatCard Title={"Closed"}>{issueCounts.closed}</StatCard>
      </Grid>
    </div>
  );
}
