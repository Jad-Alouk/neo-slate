import { z, ZodError } from "zod"

export const bizSchema = z.object({
    name: z.string()
        .min(2, "Business name must be at least 2 characters long!")
        .max(20, "Business name must not exceed 20 characters!"),
    slogan: z.string()
        .min(2, "Slogan must be at least 2 characters long!")
        .max(50, "Slogan must not exceed 50 characters!"),
    cta: z.string()
        .min(2, "Call to action must be at least 2 characters long!")
        .max(30, "Call to action must not exceed 30 characters!"),
    description: z.string()
        .min(10, "Business description must be at least 10 characters long!")
        .max(200, "Business description must not exceed 200 characters!"),
    location: z.string()
        .min(4, "Location must be at least 4 characters long!")
        .max(50, "Location must not exceed 50 characters!"),
    phone: z.string()
        .min(5, "Phone must be at least 5 characters long!")
        .max(15, "Phone must not exceed 15 characters!"),
    email: z.string()
        .min(10, "Email must be at least 10 characters long!")
        .max(100, "Email must not exceed 100 characters!"),
    website: z.string().max(100, "Website must not exceed 100 characters!").nullable(),
    links: z.strictObject({
        facebook: z.string().max(100, "Facebook link must not exceed 100 characters!").nullable(),
        twitter: z.string().max(100, "Twitter link must not exceed 100 characters!").nullable(),
        instagram: z.string().max(100, "Instagram link must not exceed 100 characters!").nullable(),
        linkedin: z.string().max(100, "Linkdin link must not exceed 100 characters!").nullable()
    }),
    workingHours: z.string()
        .min(6, "Working hours must be described with at least 6 characters!")
        .max(50, "Working hours must be described with at most 50 characters!"),
    team: z.array(z.strictObject({
        name: z.string().max(20, "Team member name must not exceed 20 characters!").nullable(),
        role: z.string().max(15, "Role must not exceed 15 characters!").nullable()
    })),
    testimonials: z.array(z.strictObject({
        name: z.string().max(20, "Reviewer's name must not exceed 20 characters!").nullable(),
        text: z.string().max(200, "Review must not exceed 200 characters").nullable(),
        rating: z.number().nullable()
    })),
    template: z.string()
        .min(4, "Template must be at least 4 characters long!")
        .max(15, "Template must not exceed 15 characters!"),
    products: z.array(z.string()).nullable()
})

export type BizError = Promise<ZodError<
    {
        name: string,
        slogan: string,
        cta: string,
        description: string,
        location: string,
        phone: string,
        email: string,
        website?: string,
        links: {
            facebook?: string,
            twitter?: string,
            instagram?: string,
            linkedin?: string
        },
        workingHours: string,
        team: {
            name?: string,
            role?: string
        },
        testimonials: {
            name?: string,
            text?: string,
            rating: number
        },
        template: string,
        products: string[]
    }
>>