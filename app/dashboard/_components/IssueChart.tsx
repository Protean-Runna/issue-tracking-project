"use client";

import { Pie, PieChart, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@radix-ui/themes";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { name: "Open", fill: "var(--red-9)", value: open },
    { name: "In progress", fill: "var(--orange-10)", value: inProgress },
    { name: "Closed", fill: "var(--green-10)", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={350}>
        <PieChart data={data} dataKey={"name"} layout="centric">
          <Pie
            data={data}
            dataKey="value"
            innerRadius={80}
            outerRadius={140}
            cx="50%"
            cy="50%"
            endAngle={360}
            stroke="var(--gray-2)"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--gray-2)",
              borderRadius: 4,
              borderColor: "var(--gray-5)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
