import { Card, Text, Heading } from "@radix-ui/themes"

interface Props {
    Title: String;
    children: React.ReactNode;
}


export default function StatCard({Title, children}: Props){


    return(
        <div>
            <Card>
            <Heading as="h3" size={"5"} mt={"1"} mb={"3"}>{Title}</Heading>
            <Text size={"5"} ml={"2"}>{children}</Text>
            </Card>
        </div>

    );
}