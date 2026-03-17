import { Flex } from "@radix-ui/themes";
import StatCard from "./StatCard";
import { Status } from "@/app/generated/prisma/enums";
import { Link } from "@/app/components";
interface Props{
    open: number;
    inProgress:number;
    closed:number;
}


const SummaryIssues = ({open, inProgress, closed} :Props) => {
    const containers: {
        label: string;
        value: number;
        status: Status;

    }[] = [
        {label: 'Open Issues', value: open, status: 'OPEN'},
        {label: 'Issues in progress', value: inProgress, status: 'IN_PROGRESS'},
        {label: 'Closed Issues', value: closed, status: 'CLOSED'},
    ]

    return (
        <Flex gap={"2"} mb="2">
           { containers.map(container => (
            <StatCard key={container.label} Title={container.label}>
                <Link href={`/issues?status=${container.status}`} size={"7"}>{container.value}</Link>
            </StatCard>
           ))}
        </Flex>
    );

};


export default SummaryIssues;