'use client'
import { Button, AlertDialog,Flex } from "@radix-ui/themes";
import Link from "@/app/components/Link";
import { ISSUES_AXIOS } from "@/app/services/apiResourceFactory";
import { useRouter } from "next/navigation";
import * as React from 'react';
import { useState } from 'react';




export default function DeleteBtn({Id}: {Id: number}) {
    const [Error, setError] = useState(false);
    const router = useRouter();
    const issueId = Id.toString();

    const DeleteIssue = async () => {  
          try {  
            await ISSUES_AXIOS.delete(issueId);     
            router.push('/issues'); 
            router.refresh();       
          } catch (error) {
            console.log(error);
            setError(true);

          }          
        };
    return(
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Whoa there!</AlertDialog.Title>
                    <AlertDialog.Description size={"2"}>Are you sure that you want to delete this issue?</AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="start">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" onClick={DeleteIssue} color="red">
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={Error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>ERROR</AlertDialog.Title>
                    <AlertDialog.Description size={"2"}>This issue could not be deleted</AlertDialog.Description>
                            <Button mt={"2"} variant="soft" color="gray" onClick={() => setError(false)}>
                                OK
                            </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>




    )
    
}