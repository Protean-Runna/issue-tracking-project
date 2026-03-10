import { StatusBadge, EditDelBtnGroup } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Card, DataList, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueData = ({issue}: {issue: Issue}) => {
  return (
    <div>
      <Card size={"3"}>
        <DataList.Root mb={"4"} size={"3"}>
          {/** Title*/}
          <DataList.Item align={"center"}>
            <DataList.Label>Issue:</DataList.Label>
            <DataList.Value>{issue.title}</DataList.Value>
          </DataList.Item>
          {/** Status */}
          <DataList.Item>
            <DataList.Label>Status:</DataList.Label>
            <DataList.Value>
              <StatusBadge dbStatus={issue.status || "grey"} />
            </DataList.Value>
          </DataList.Item>
          {/** Created */}
          <DataList.Item>
            <DataList.Label>Created:</DataList.Label>
            <DataList.Value>{new Date(issue.createdAt).toDateString()}</DataList.Value>
          </DataList.Item>
          {/** Updated */}
          <DataList.Item>
            <DataList.Label>Updated:</DataList.Label>
            <DataList.Value>{new Date(issue.updatedAt).toDateString()}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <EditDelBtnGroup Id={issue.id} />
      </Card>
      <Card mt={"4"}>
        <Text as="div" className="prose dark:prose-invert">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Text>
      </Card>
    </div>
  );
};

export default IssueData;
