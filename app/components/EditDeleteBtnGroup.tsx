import { Button } from "@radix-ui/themes";
import Link from "./Link";

interface Props {
    Id:number;
}


export default function EditDelBtnGroup({Id}: Props) {

    return(
        <div>
            <Button asChild variant="outline" mr={"1"}>
                <Link href={`/issues/${Id}/edit`} underline="none">Edit</Link>
            </Button>
            <Button asChild > 
                <Link color="red" underline="none" href={`/issues/${Id}/delete`} ml={"1"}>Delete</Link>
            </Button>
        </div>
    )
    
}