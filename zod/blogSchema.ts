import { z, ZodError } from "zod"

export const blogSchema = z.object({
    title: z.string()
        .min(4, "Title must be at least 4 characters long!")
        .max(50, "Title must not exceed 50 characters!"),
    writer: z.string()
        .min(2, "Writer's name must be at least 2 characters long!")
        .max(20, "Writer's name must not exceed 20 characters!"),
    post: z.string()
        .min(200, "Post must be at least 200 characters long!"),
    template: z.string()
        .min(4, "Template must be at least 4 characetrs long!")
        .max(15, "Template must not exceed 15 characters!"),
    titleFont: z.string()
        .min(3, "Font type must be at least 3 characters long!")
        .max(20, "Font type must not exceed 20 characters!"),
    bodyFont: z.string()
        .min(3, "Font type must be at least 3 characters long!")
        .max(20, "Font type must not exceed 20 characters!"),
    category: z.string()
        .min(3, "Category must be at least 3 characters long!")
        .max(15, "Category must not exceed 15 characters!"),
    instagram: z.string()
        .max(100, "Link must not exceed 100 characetrs!"),
    twitter: z.string()
        .max(100, "Link must not exceed 100 characetrs!"),
    linkedin: z.string()
        .max(100, "Link must not exceed 100 characetrs!")
})

export type BlogError = Promise<ZodError<
    {
        title: string
        writer: string
        post: string
        template: string
        titleFont: string
        bodyFont: string
        category: string
        instagram: string
        twitter: string
        linkedin: string
    }
>>