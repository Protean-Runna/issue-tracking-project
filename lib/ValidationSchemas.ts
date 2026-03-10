import {z} from "zod";

// All the validation schemas will go here

export const IssueSchema = z.object(
    {
        title: z.string().min(1, "A title is required").max(255),
        description: z.string().min(1, "A description is required")
    }
);
