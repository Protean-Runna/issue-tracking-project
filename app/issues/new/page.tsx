'use client'
import { TextField, TextArea, Button } from "@radix-ui/themes"
import {useForm} from 'react-hook-form';
import {issuesAxios} from "@/app/services/apiIssues";
import { useRouter } from "next/navigation";


interface IssueForm {
  title: string;
  description: string;
}




const NewIssuePage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<IssueForm>()

  
  return (
  
        <form 
        className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
          await issuesAxios.create(data);
          router.push('/issues');
        })} >
            <TextField.Root variant="surface" radius="large" placeholder="Title..." {...register('title')}/>
            <TextArea maxLength={450} variant="surface" placeholder="Description..." {...register('description')} />
            <Button variant="surface">Submit Issue</Button>

        </form>
        

  )
}

export default NewIssuePage
