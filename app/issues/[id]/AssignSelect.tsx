'use client'
import { USERS_AXIOS } from "@/app/services/apiResourceFactory";
import { Select, Skeleton, Button } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query";

const AssignSelect = () => {
    const {data: users, error, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: () => USERS_AXIOS.getAll().then(res => res.data),
        staleTime: 120 * 1000,
        retry: 2,
    })

    if (isLoading) return <Button asChild><Skeleton>Assign......</Skeleton></Button>;

    if (error) return null;


    return( 
        <Select.Root>
            <Select.Trigger placeholder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )
                     )}
                    

                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
    
}


export default AssignSelect;