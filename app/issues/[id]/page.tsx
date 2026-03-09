
import { notFound } from 'next/navigation';
import { issuesAxios } from '@/app/services/apiIssues';
import { Text, Card, Flex, Box } from '@radix-ui/themes';
import { STATUS_COLOURS } from "@/lib/Constants/Status";
import { Status } from '@/app/generated/prisma/enums';
async function fetchIssue(id:string) {
    const res = await issuesAxios.getSingle(id);
    if (!res){
            return null;
        }
        const issue = await res.data;
        return issue;
}


const issueDetailsPage = async ({params}: {params: Promise<{id:string}>}) => {

    
    const {id} = await params;
    const issue = await fetchIssue(id);
    if (!issue){
       return notFound();
    }
    const StatusColour = STATUS_COLOURS || 'white';
    return(
        <Box maxWidth={"450px"}>
            <Card>
                <Flex justify={"center"} align={"center"} direction={"column"} gap={"2"}>
                    <Text>Issue: {issue?.title}</Text>
                    <Box minHeight={"50px"}>
                        <Text>{issue?.description}</Text>
                    </Box>
                    <Text color={StatusColour[issue?.status as Status]}>{issue?.status}</Text>
                </Flex>
            </Card>
        </Box>
       
    );
}

/*
export async function metadataGenerator({params}: IssueDetailsPageProps) {
    const issue = await fetchIssue(parseInt(params.id));
    return {
    title: `Issue: ${issue?.title}`,
    description: issue?.description,
  };
}
*/

export default issueDetailsPage;