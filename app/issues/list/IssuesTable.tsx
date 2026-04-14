import { Table, Button, Text } from "@radix-ui/themes";
import { StatusBadge, Link, Date } from "@/app/components";
import { Issue, Status } from "@/app/generated/prisma/client";
import { Edit } from "../_components/Buttons";
import NextLink from "next/link";
import { auth } from "@/auth";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

interface Props {
  searchParams:  IssueQuery,
  issues: Issue[]

}
export interface IssueQuery {
  status: Status; orderBy:keyof Issue; page: string; sortOrder: string;
}

const IssuesTable = async ({ issues, searchParams }:Props) => {
  const params = await searchParams;
  const session = await auth();
  
  return (
    <div>
      <Table.Root variant="surface" size={"2"}>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isActive = column.value === params.orderBy
              const nextOrder = (isActive && params.sortOrder === 'asc')
              ? 'desc' : 'asc';
              return(
              <Table.ColumnHeaderCell key={column.value} className={column.classname}>
                <NextLink href={{
                  pathname:'/issues/list',
                  query: { ...params, orderBy: column.value, sortOrder: nextOrder}
                }}>{column.label}</NextLink>
                {isActive && <Text >{params.sortOrder === 'asc' ?<BsArrowUp className="inline"/> : <BsArrowDown className="inline"/>}</Text>}
                </Table.ColumnHeaderCell>
            )})}
            <Table.ColumnHeaderCell>
              <Button asChild>
                <Link href="/issues/new" underline="none" size={"2"}>
                  Create
                </Link>
              </Button>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <StatusBadge dbStatus={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge dbStatus={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Date date={issue.createdAt}/>
              </Table.Cell>
              <Table.Cell justify={"start"}>
                {session && 
                <Edit Id={issue.id}/>
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

const columns: {label: string; value: keyof Issue; classname?: string;}[] = [
      {label: 'Issue', value: 'title'},
      {label: 'Status', value: 'status', classname: "hidden md:table-cell"},
      {label: 'Created', value: 'createdAt', classname: "hidden md:table-cell"},
  
    ];
    
export const columnNames = columns.map((column) => column.value);


export default IssuesTable;
