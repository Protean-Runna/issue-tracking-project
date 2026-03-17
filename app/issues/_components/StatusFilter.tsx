'use client'
import React from "react";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";




const StatusFilter = () => {
    const router = useRouter();

    return(
        <div>
            <Select.Root onValueChange={(status) => {
                const safe = status ?? 'all';
                const query = `?status=${encodeURIComponent(safe)}`;
                router.push('/issues' + query);
            }}>
                <Select.Trigger mb={"1"} placeholder="Sort by status..."/>
                <Select.Content>
                    <Select.Item value="all">All Issues</Select.Item>
                    <Select.Item value="OPEN">Open</Select.Item>
                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                    <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
    )

}


export default StatusFilter;