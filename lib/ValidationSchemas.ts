import {z} from "zod";
import { Status } from "@/app/generated/prisma/enums";
// All the validation schemas will go here

export const IssueSchema = z.object(
    {
        title: z.string().min(1, "A title is required").max(255),
        description: z.string().min(1, "A description is required").max(65535),
        status: z.enum(Status).optional(),          // This is probably not very efficient, but it works for now
    }
);


export const PatchIssueSchema = z.object(
    {
        title: z.string()
            .min(1, "A title is required")
            .max(255)
            .optional(),
        description: z.string()
            .min(1, "A description is required")
            .max(65535)
            .optional(),
        status: z.enum(Status).optional(),
        assignedToUserId: z.string()
            .min(1, 'AssignedToUserId required')
            .max(255)
            .optional()
            .nullable()
    }
);