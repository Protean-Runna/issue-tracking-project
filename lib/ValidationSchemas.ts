import {z} from "zod";
import { Status } from "@/app/generated/prisma/enums";
// All the validation schemas will go here

export const IssueSchema = z.object(
    {
        title: z.string().min(1, "A title is required").max(255),
        description: z.string().min(1, "A description is required"),
        status: z.enum(Status).optional(),          // This is probably not very efficient, but it works for now
    }
);
