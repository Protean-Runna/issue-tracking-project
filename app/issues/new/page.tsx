'use client'
import { TextField, TextArea, Button } from "@radix-ui/themes"




const NewIssuePage = () => {
  return (
  
        <form className='max-w-xl space-y-3' >
            <TextField.Root variant="soft" radius="large" placeholder="Title"/>
            <TextArea variant="soft" placeholder="Description" />
            <Button>Submit Issue</Button>

        </form>
        

  )
}

export default NewIssuePage
