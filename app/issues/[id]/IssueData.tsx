import { StatusBadge, BtnGroup, Date } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Card, DataList, Flex, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Edit, Delete } from "../_components/Buttons";
import { auth } from "@/auth";
import AssignSelect from "./AssignSelect";

interface Props {
  issue: Issue,
}

const IssueData = async ({issue}: Props) => {
  const session = await auth();
  
  return (
    <div>
      <Card size={"3"}>
        <DataList.Root mb={"4"} size={"3"}>
          {/** Title*/}
          <DataList.Item>
            <DataList.Label style={{color:'var(--accent-10'}}>Issue:</DataList.Label>
            <DataList.Value className="min-w-0 wrap-break-word whitespace-normal max-w-full" >{issue.title}</DataList.Value>
          </DataList.Item>
          {/** Status */}
          <DataList.Item>
            <DataList.Label style={{color:'var(--accent-10'}}>Status:</DataList.Label>
            <DataList.Value>
              <StatusBadge dbStatus={issue.status || "grey"} />
            </DataList.Value>
          </DataList.Item>
          {/** Created */}
          <DataList.Item>
            <DataList.Label style={{color:'var(--accent-10'}}>Created:</DataList.Label>
            <DataList.Value><Date date={issue.createdAt}/></DataList.Value>
          </DataList.Item>
          {/** Updated */}
          <DataList.Item>
            <DataList.Label style={{color:'var(--accent-10'}}>Updated:</DataList.Label>
            <DataList.Value><Date date={issue.updatedAt}/></DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {session && 
          <Flex justify={'start'} align={'start'} direction={'column'} gap={'3'}>
            <AssignSelect issue={issue}/>
            <BtnGroup btnL={<Edit Id={issue.id}/>} btnR={<Delete Id={issue.id}/>} />
          </Flex> 
        }
      </Card>
      <Card mt={"4"} className="min-w-0">
        <Text as="div" mt={"2"} mb={"2"} className="prose-invert wrap-break-word whitespace-normal max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Text>
      </Card>
    </div>
  );
};

export default IssueData;
