import { Button } from "@radix-ui/themes";
import Link from "@/app/components/Link";

interface Props {
    Id:number;
}


export default function EditBtn({Id}: Props) {

    return(
            <Button asChild variant="outline">
                <Link href={`/issues/${Id}/edit`} underline="none">Edit</Link>
            </Button> 
    )
    
}