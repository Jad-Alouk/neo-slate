import { z, ZodError } from "zod"

export const productSchema = z.object({
    owner: z.string()
        .min(2, "Owner's name must be at least 2 characters long!")
        .max(20, "Owner's name must not exceed 20 characters!"),
    name: z.string()
        .min(4, "Product name must be at least 4 characters long!")
        .max(50, "Product name must not exceed 50 characters!"),
    description: z.string().max(200, "Description must not exceed 200 characters!"),
    quantity: z.number().min(1, "Initial quantity must be provided!"),
    price: z.number(),
    contactNum: z.string().max(15, "Number must not exceed 15 characters!"),
    contactEmail: z.string().max(100, "Email must not exceed 100 characters!")
})

export type ProductError = Promise<ZodError<{
    owner: string
    name: string
    description: string
    quantity: number
    price: number
    contactNum: string
    contactEmail: string
}>>