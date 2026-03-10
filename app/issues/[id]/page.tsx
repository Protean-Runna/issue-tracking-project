
import { notFound } from 'next/navigation';
import { issuesAxios } from '@/app/services/apiIssues';
import { Text, Card, Flex, Box, DataList } from '@radix-ui/themes';
import { StatusBadge } from '@/app/components/statusBadge';
async function fetchIssue(id:string) {
    const res = await issuesAxios.getSingle(id);
    if (!res){
            return null;
        }
        const issue = res.data;
        return issue;
}


const issueDetailsPage = async ({params}: {params: Promise<{id:string}>}) => {

    
    const {id} = await params;
    const issue = await fetchIssue(id);
    if (!issue){
       return notFound();
    }

    return(
        <Flex justify={"center"} align={"center"}>
            <Box maxWidth={"500px"}>
                <Card size={"3"}>
                    <DataList.Root mb={"5"} size={"2"}  >
                         {/** Title*/}
                        <DataList.Item align={"center"}>
                           
                        <DataList.Label>Issue:</DataList.Label>
                        <DataList.Value>{issue?.title}</DataList.Value>
                        </DataList.Item>
                        {/** Status */}
                        <DataList.Item>
                        <DataList.Label>Status:</DataList.Label>
                        <DataList.Value><StatusBadge dbStatus={issue.status || "grey"} /></DataList.Value>
                        </DataList.Item>
                        {/** Created */}
                        <DataList.Item>
                        <DataList.Label>Created:</DataList.Label>
                        <DataList.Value>{issue?.createdAt}</DataList.Value>
                        </DataList.Item>
                        {/** Updated */}
                        <DataList.Item>
                        <DataList.Label>Updated:</DataList.Label>
                        <DataList.Value>{issue?.updatedAt}</DataList.Value>
                        </DataList.Item>

                    </DataList.Root>
                        <Box minHeight={"50px"}>
                            <Text>{issue?.description}</Text>
                        </Box>
                        
                   
                </Card>
            </Box>
        </Flex>
       
    );
}


export default issueDetailsPage;