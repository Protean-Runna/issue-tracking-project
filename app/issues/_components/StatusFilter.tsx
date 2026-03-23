'use client'
import React from "react";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";




const StatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    return(
        <div>
            <Select.Root defaultValue={searchParams.get('status' )|| ''} onValueChange={(status) => {
                const params = new URLSearchParams();
                if (status) params.append('status', status);
                if (searchParams.get('orderBy'))
                    params.append('orderBy', searchParams.get('orderBy')!)
                
                const safe = status ?? 'all';
                const query = params.size ? '?' + params.toString(): '';
                router.push('/issues/list' + query);
            }}>
                <Select.Trigger mb={"1"} placeholder="Sort by status..."/>
                <Select.Content>
                    <Select.Item value={null as unknown as string}>All Issues</Select.Item>
                    <Select.Item value="OPEN">Open</Select.Item>
                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                    <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
    )

}


export default StatusFilter;