import { BtnGroup } from "@/app/components";
import {
  Flex,
  Button,
  Card,
  DataList,
  Badge,
  Text,
  Skeleton,
  Container,
} from "@radix-ui/themes";

export default function LoadingState() {
  return (
    <Flex justify={"center"} align={"center"}>
      <Container size={"3"}>
        <Card size={"3"}>
          <DataList.Root mb={"4"} size={"3"}>
            {/** Title*/}
            <DataList.Item align={"center"}>
              <DataList.Label>Issue:</DataList.Label>
              <DataList.Value>
                <Skeleton>
                  <Text>Bug 1</Text>
                </Skeleton>
              </DataList.Value>
            </DataList.Item>
            {/** Status */}
            <DataList.Item>
              <DataList.Label>Status:</DataList.Label>
              <DataList.Value>
                <Skeleton>
                  <Badge size={"2"}>Status</Badge>
                </Skeleton>
              </DataList.Value>
            </DataList.Item>
            {/** Created */}
            <DataList.Item>
              <DataList.Label>Created:</DataList.Label>
              <DataList.Value>
                <Skeleton>
                  <Text>Mon 00 0000</Text>
                </Skeleton>
              </DataList.Value>
            </DataList.Item>
            {/** Updated */}
            <DataList.Item>
              <DataList.Label>Updated:</DataList.Label>
              <DataList.Value>
                <Skeleton>
                  <Text>Mon 00 0000</Text>
                </Skeleton>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Assignee:</DataList.Label>
              <DataList.Value>
                  <Button asChild><Skeleton>Assigned</Skeleton></Button>
              </DataList.Value>
            </DataList.Item>
            
          </DataList.Root>
            <Flex direction={'column'} align={'start'} gap={'3'}>
              <BtnGroup 
              btnL={<Button asChild variant="outline"><Skeleton>Edit</Skeleton></Button>}
              btnR={<Button asChild><Skeleton>Delete</Skeleton></Button>}/>
            
            </Flex>
        </Card>
        <Card mt={"4"}>
          <Text as="div" mt={"2"} mb={"2"}>
            <Skeleton >
              Lorem ipsum dolor sit amet, consectetur.
            </Skeleton>
          </Text>
        </Card>
      </Container>
    </Flex>
  );
}
