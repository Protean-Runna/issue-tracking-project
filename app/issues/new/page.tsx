'use client'
import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { TextField, Callout, Button } from "@radix-ui/themes";
import {useForm, Controller} from 'react-hook-form';
import {issuesAxios} from "@/app/services/apiIssues";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>()
  const [error, setError] = useState('');
  const onSubmit = handleSubmit(async (data) => {  
          try {
            await issuesAxios.create(data);
            router.push('/issues');            
          } catch (error) {
            console.log(error);
            setError('An unexpected error has occurred. Please try again.');
          }          
        })

  
  return (
        <div className="max-w-xl">
          {error && 
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
            }
        
  
          <form 
          className=' space-y-3 space-x-5 mt-2' onSubmit={onSubmit} >
              <TextField.Root variant="surface" radius="large" placeholder="Title..." {...register('title')}/>
              <Controller name="description" control={control} render={({field}) => <SimpleMDE  placeholder="Description..." {...field} />} />
              <Button variant="surface" size={"3"}>Submit Issue</Button>
          </form>
        </div>
        

  )
}

export default NewIssuePage
