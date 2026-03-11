'use client'
import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { TextField, Callout, Button, Spinner } from "@radix-ui/themes";
import {useForm, Controller} from 'react-hook-form';
import { ISSUES_AXIOS } from "@/app/services/apiResourceFactory";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/lib/ValidationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import { Issue } from "@/app/generated/prisma/client";
import SimpleMDE from "react-simplemde-editor";


type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({issue} : {issue?: Issue}) => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema)
  })

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {  
          try {
            setIsSubmitting(true);
            if (issue) {
              await ISSUES_AXIOS.update(issue.id.toString(), data)
            }else {
              await ISSUES_AXIOS.create(data);
            }
            
            router.push('/issues'); 
            router.refresh();       
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
              <TextField.Root variant="surface" defaultValue={issue?.title} radius="large" placeholder="Title..." {...register('title')}/>
              
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
              <Controller name="description" defaultValue={issue?.description} control={control} render={({field}) => <SimpleMDE  placeholder="Description..." {...field} />} />
              <Button disabled={isSubmitting} variant="surface" size={"3"}>{issue ? 'Update Issue' : 'Submit Issue'}{''}{ isSubmitting && <Spinner/> || null}</Button>
          </form>
        </div>
        

  )
}

export default IssueForm
