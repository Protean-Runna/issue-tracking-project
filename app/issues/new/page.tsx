'use client'
import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { TextField, Callout, Button, Spinner } from "@radix-ui/themes";
import {useForm, Controller} from 'react-hook-form';
import {issuesAxios} from "@/app/services/apiIssues";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/lib/ValidationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {  
          try {
            setIsSubmitting(true);
            await issuesAxios.create(data);
            router.push('/issues');            
          } catch (error) {
            setIsSubmitting(false);
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
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
              <TextField.Root variant="surface" radius="large" placeholder="Title..." {...register('title')}/>
              
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
              <Controller name="description" control={control} render={({field}) => <SimpleMDE  placeholder="Description..." {...field} />} />
              <Button disabled={isSubmitting} variant="surface" size={"3"}>Submit Issue { isSubmitting && <Spinner/> || null}</Button>
          </form>
        </div>
        

  )
}

export default NewIssuePage
