'use client'
import { Issue } from "@/app/generated/prisma/client";
import { ISSUES_AXIOS, USERS_AXIOS } from "@/app/services/apiResourceFactory";
import { Select, Skeleton, Button } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from 'sonner';
const AssignSelect = ({issue}: {issue: Issue}) => {
    const {data: users, error, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: () => USERS_AXIOS.getAll().then(res => res.data),
        staleTime: 120 * 1000,
        retry: 2,
    })

    if (isLoading) return <Button asChild><Skeleton>Assign......</Skeleton></Button>;

    if (error) return null;

    return( 
        <>
        <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={(userId) =>{
            const issueId = issue.id.toString();
            ISSUES_AXIOS.update(issueId, {assignedToUserId: userId || null})
            .catch(() => {
                toast.error('Could not save changes');
            });
        }}>
            <Select.Trigger placeholder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value={null as unknown as string}>Unassigned</Select.Item>
                    {users?.map(user => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )
                     )}
                    

                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster position="top-center" richColors/>
        
        </>
    )
    
}


export default AssignSelect;