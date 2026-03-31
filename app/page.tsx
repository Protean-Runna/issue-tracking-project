import { Box, Flex, Text, Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
export default function Home() {
  return (
    <Box position="relative" top="9">
      <Flex justify="center" align="center" gap="5" direction="column">
        <Heading as="h1" size="9">Issue Tracky</Heading>
        <Text size="7">
          Track and fix issues <Text weight="bold" style={{color:'var(--accent-10)'}}>the easy way</Text>
        </Text>
        <Flex align={'center'} gap="3" >
          <Button size="4" asChild><Link href="/issues/list">See Issues</Link></Button>
          <Button size="4" variant="outline" asChild><Link href="/dashboard">Dashboard</Link></Button>
        </Flex>
      </Flex>
    </Box>
  );
}
