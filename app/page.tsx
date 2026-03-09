import { Box, Flex, Text, Button, Heading } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <Box position="relative" top="9">
      <Flex justify="center" align="center" gap="5" direction="column">
        <Heading as="h1" size="9">Generic Issue Tracker</Heading>
        <Text size="7">
          Track and fix issues <Text weight="bold" color="orange">the easy way</Text>
        </Text>
        <Flex align={'center'} gap="3" >
          <Button size="4" asChild><Link href="/issues">See Issues</Link></Button>
          <Button size="4" variant="outline" asChild><Link href="/dashboard">Dashboard</Link></Button>
        </Flex>
      </Flex>
    </Box>
  );
}
