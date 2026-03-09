"use client"

import { STATUS_COLOURS } from "@/lib/Constants/Status";
import { Badge} from "@radix-ui/themes";
import { Status } from "../generated/prisma/enums";

interface Props {
    dbStatus: string;
}

export const StatusBadge = ({dbStatus}: Props) =>{
    const color = STATUS_COLOURS[dbStatus as Status];

    return <Badge size={"3"} color={color}>{dbStatus.replace("_", " ")}</Badge>
}