import { Button } from "@radix-ui/themes";
import Link from "@/app/components/Link";

interface Props {
    Id:number;
}


export default function DeleteBtn({Id}: Props) {

    return(

            <Button asChild > 
                <Link color="red" underline="none" href={`/issues/${Id}/delete`}>Delete</Link>
            </Button>

    )
    
}