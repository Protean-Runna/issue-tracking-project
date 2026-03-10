
import { notFound } from 'next/navigation';
import { issuesAxios } from '@/app/services/apiIssues';
import { Text, Card, Flex, DataList, Container} from '@radix-ui/themes';
import { StatusBadge } from '@/app/components/statusBadge';
import delay from 'delay';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: {id:string};
}

const issueDetailsPage = async ({params}: Props) => {

    
    const {id} = await params;
    const res = await issuesAxios.getSingle(id);
    
    if (!res){
       return notFound();
    }
    await delay(1000);

    const issue = res.data;

    return(
        <Flex justify={"center"} align={"center"}>
            <Container size={"3"}>
                <Card size={"3"}>
                        <DataList.Root mb={"5"} size={"3"}  >
                            {/** Title*/}
                            <DataList.Item align={"center"}>
                            
                            <DataList.Label>Issue:</DataList.Label>
                            <DataList.Value>{issue.title}</DataList.Value>
                            </DataList.Item>
                            {/** Status */}
                            <DataList.Item>
                            <DataList.Label>Status:</DataList.Label>
                            <DataList.Value><StatusBadge dbStatus={issue.status || "grey"} /></DataList.Value>
                            </DataList.Item>
                            {/** Created */}
                            <DataList.Item>
                            <DataList.Label>Created:</DataList.Label>
                            <DataList.Value>{issue.createdAt}</DataList.Value>
                            </DataList.Item>
                            {/** Updated */}
                            <DataList.Item>
                            <DataList.Label>Updated:</DataList.Label>
                            <DataList.Value>{issue.updatedAt}</DataList.Value>
                            </DataList.Item>

                        </DataList.Root>
                    </Card>
                    <Card  mt={"4"} >
                        <Text as="div" className='prose dark:prose-invert'><ReactMarkdown>{issue.description}</ReactMarkdown></Text>
                    </Card>
                
            </Container>
        </Flex>
       
    );
}


export default issueDetailsPage;