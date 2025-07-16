import { z, ZodError } from "zod"

export const portfolioSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters long!")
        .max(20, "Name must not exceed 20 characters!"),
    location: z.string()
        .min(4, "Location must be at least 4 characters long!")
        .max(50, "Location must not exceed 50 characters!"),
    bio: z.string()
        .min(5, "Bio must be at least 5 characters long!")
        .max(200, "Bio must not exceed 200 characters!"),
    contactInfo: z.strictObject({
        phone: z.string()
            .min(5, "Phone must be at least 5 characters long!")
            .max(15, "Phone must not exceed 15 characters!"),
        email: z.string()
            .min(10, "Email must be at least 10 characters long!")
            .max(100, "Email must not exceed 100 characters!"),
        website: z.string().max(100, "Website must not exceed 100 characters!").nullable(),
        linkedin: z.string().max(100, "Linkdin link must not exceed 100 characters!").nullable(),
        github: z.string().max(100, "Github link must not exceed 100 characters!").nullable()
    }),
    experience: z.string().min(100, "Experience must be at least 100 characters long!"),
    education: z.string().min(100, "Education must be at least 100 characters long!"),
    skills: z.string().min(4, "Skills must be at least 4 characters long!"),
    projects: z.string().min(100, "Projects must be at least 100 characters long!"),
    languages: z.string().min(3, "Languages must be at least 3 characters long!"),
    certifications: z.string().min(100, "Certifications must be at least 100 characters long!"),
    template: z.string()
        .min(4, "Template must be at least 4 characters long!")
        .max(15, "Template must not exceed 15 characters!")
})

export type PortfolioError = Promise<ZodError<{
    name: string
    location: string
    bio: string
    contactInfo: {
        phone: string
        email: string
        website?: string
        linkedin?: string
        github?: string
    }
    experience: string
    education: string
    skills: string
    projects: string
    languages: string
    certifications: string
    template: string
}>>