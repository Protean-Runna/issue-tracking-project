import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function issues(){
    return (
        <div className="flex min-h-screen ">
            <Button><Link  href='/issues/new'>New Issue</Link></Button>
        </div>

    );
}