import {
  Flex,
  Box,
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
          <DataList.Root mb={"5"} size={"3"}>
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
          </DataList.Root>
        </Card>
        <Card mt={"4"}>
          <Text>
            <Skeleton >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque felis tellus, efficitur id convallis a, viverra eget
              libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
              magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque felis tellus, efficitur id convallis a, viverra eget
              libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
              magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque felis tellus, efficitur id convallis a, viverra eget
              libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
              magna.
            </Skeleton>
          </Text>
        </Card>
      </Container>
    </Flex>
  );
}
