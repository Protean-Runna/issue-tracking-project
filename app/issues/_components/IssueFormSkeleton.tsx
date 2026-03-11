import { Skeleton, Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className="max-w-xl">
            <div className="mt-2">
                <Box mb={"3"}>
                    <Skeleton height={"2rem"}/>
                </Box>
                <Skeleton height="20rem"/>
            </div>
        </Box>
    )
}

export default IssueFormSkeleton;