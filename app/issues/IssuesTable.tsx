import { Table, Button, Text } from "@radix-ui/themes";
import { StatusBadge, EditDelBtnGroup, Link } from "../components";
import { Issue } from "../generated/prisma/client";

const IssuesTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <div>
      <Table.Root variant="surface" size={"2"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Button asChild>
                <Link href="/issues/new" underline="none" size={"2"}>
                  New Issue
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
                <Text>{new Date(issue.createdAt).toDateString()}</Text>
              </Table.Cell>
              <Table.Cell justify={"start"}>
                <EditDelBtnGroup Id={issue.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesTable;
