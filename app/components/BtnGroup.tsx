import { Box, Button } from "@radix-ui/themes";
import Link from "./Link";

interface Props {
    btnL?: React.ReactNode;
    btnR?: React.ReactNode;
    gap?: string; // Tailwind gap class like "gap-2" or a raw className fragment
    className?: string;
}


export default function BtnGroup({btnL, btnR, gap = "gap-2", className=""}: Props) {

    return(
        <div className={`flex items-center ${gap} ${className}`}>
            <div className="min-w-0">{btnL ?? null}</div>
        <div className="min-w-0">{btnR ?? null}</div>
        </div>
    )
    
}