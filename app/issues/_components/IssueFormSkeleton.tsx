import { Skeleton, Box, Button } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className="max-w-xl">
            <div className="mt-2">
                
                <Box mb={"3"}>
                    <Skeleton height={"3rem"}/>
                </Box>
                <Skeleton>
                    <Button size={"3"}>Open V </Button>
                </Skeleton>
                <Skeleton mt={"2"} height="23rem"/>

                <Skeleton mt="8">
                    <Button size={"3"}>Submit Issue</Button>
                </Skeleton>
            </div>
        </Box>
    )
}

export default IssueFormSkeleton;