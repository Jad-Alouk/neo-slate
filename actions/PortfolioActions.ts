"use server"

import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"

import { deletePortfolio, insertPortfolio } from "@/db/supabase-requests/PortfolioRequests"
import { selectPortfolio } from "@/db/supabase-requests/PortfolioRequests"
import { updatePortfolio } from "@/db/supabase-requests/PortfolioRequests"

import { deleteImage, selectImage, uploadImage } from "@/db/supabase-requests/ImageRequests"
import { updateImage } from "@/db/supabase-requests/ImageRequests"

import { z } from "zod"
import { portfolioSchema } from "@/zod/portfolioSchema"
import sanitize from "sanitize-html"

import { ParamValue } from "next/dist/server/request/params"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

/*
    All server actions:

        - Utilized through the useActionState hook:
            Custom error messages are returned in case of invalid form input.

        - Check authentication, at the top, through getClerkSession():
            A custom function that returns clerk userId and a jwt used for authenticated db connections.
            (Refer to utils -> clerkHelpers.ts).

        - Authenticate db requests through clerk tokens:
            A clerk template is created to use clerk jwt's in the req header -> authorization when connecting to the db. This way create, update and delete operations are executed on authenticated connections while read operations can be done publicly.
            (Refer to  utils -> clerkHelpers.ts and db -> supabaseClient.ts).

        - Receive form data to be escaped and sanitized.

        - Call other custom functions to execute the actual db query.

*/

export async function CreatePortfolio(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Form data is receieved, validated and sanitized
    const name = formData.get("name") as string
    const location = formData.get("location") as string
    const bio = formData.get("bio") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const website = formData.get("website") as string
    const linkedin = formData.get("linkedin") as string
    const github = formData.get("github") as string
    const experience = formData.get("experience") as string
    const education = formData.get("education") as string
    const skills = formData.get("skills") as string
    const projects = formData.get("projects") as string
    const languages = formData.get("languages") as string
    const certifications = formData.get("certifications") as string
    const template = formData.get("template") as string
    const file = formData.get("file") as File

    const contactInfo = {
        phone,
        email,
        website,
        linkedin,
        github
    }

    const sanitizedExperience = sanitize(experience)
    const sanitizedEducation = sanitize(education)
    const sanitizedProjects = sanitize(projects)
    const sanitizedCertifications = sanitize(certifications)

    const validPortfolio = portfolioSchema.safeParse({
        name,
        location,
        bio,
        contactInfo,
        experience: sanitizedExperience,
        education: sanitizedEducation,
        skills,
        projects: sanitizedProjects,
        languages,
        certifications: sanitizedCertifications,
        template
    })

    if (!validPortfolio.success) {
        // return validPortfolio.error
        return { msg: validPortfolio.error.message }
    }


    // Image uploading is not optional for portfolios, user must provide a profile photo.
    if (file.size == 0) {
        throw new Error(
            "Invalid portfolio data: An image must be provided to display the portfolio"
        )
    } else {

        // The db query
        const response = await insertPortfolio(
            supabase,
            validPortfolio.data.name,
            validPortfolio.data.location,
            validPortfolio.data.bio,
            validPortfolio.data.contactInfo,
            sanitizedExperience,
            sanitizedEducation,
            validPortfolio.data.skills,
            sanitizedProjects,
            validPortfolio.data.languages,
            sanitizedCertifications,
            validPortfolio.data.template
        )


        // The response is an id that is used as the image path.
        await uploadImage(supabase, file, response, "portfolio-images")
        redirect(`/portfolio/${response}`)
    }
}


// Used by several functions down below
const validateURL = z.string().uuid()


// Redundant function. Fetching a portfolio should be a public operation and no server action is needed.
// selectPortfolio() should be used instead. The logic will be kept here in case of future need.
export async function FetchPortfolio(slug: string | ParamValue) {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const response = await selectPortfolio(slug)

    return response
}


export async function EditPortfolio(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Form data is receieved, validated and sanitized
    const name = formData.get("name") as string
    const location = formData.get("location") as string
    const bio = formData.get("bio") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const website = formData.get("website") as string
    const linkedin = formData.get("linkedin") as string
    const github = formData.get("github") as string
    const experience = formData.get("experience") as string
    const education = formData.get("education") as string
    const skills = formData.get("skills") as string
    const projects = formData.get("projects") as string
    const languages = formData.get("languages") as string
    const certifications = formData.get("certifications") as string
    const template = formData.get("template") as string
    const file = formData.get("file") as File
    const paramsId = formData.get("paramsId") as string
    const validURL = validateURL.safeParse(paramsId)

    if (!validURL.success) {
        throw new Error(
            `${paramsId} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const contactInfo = {
        phone,
        email,
        website,
        linkedin,
        github
    }

    const sanitizedExperience = sanitize(experience)
    const sanitizedEducation = sanitize(education)
    const sanitizedProjects = sanitize(projects)
    const sanitizedCertifications = sanitize(certifications)

    const validPortfolio = portfolioSchema.safeParse({
        name,
        location,
        bio,
        contactInfo,
        experience: sanitizedExperience,
        education: sanitizedEducation,
        skills,
        projects: sanitizedProjects,
        languages,
        certifications: sanitizedCertifications,
        template
    })

    if (!validPortfolio.success) {
        // return validPortfolio.error
        return { msg: validPortfolio.error.message }
    }


    // The db query
    const response = await updatePortfolio(
        supabase,
        validURL.data,
        validPortfolio.data.name,
        validPortfolio.data.location,
        validPortfolio.data.bio,
        validPortfolio.data.contactInfo,
        sanitizedExperience,
        sanitizedEducation,
        validPortfolio.data.skills,
        sanitizedProjects,
        validPortfolio.data.languages,
        sanitizedCertifications,
        validPortfolio.data.template
    )


    // Image uploading is optional for updating, user can keep old images.
    // The response is an id that is used as the image path.
    if (file.size > 0) {
        await updateImage(supabase, file, response, "portfolio-images")
    }

    redirect(`/portfolio/${response}`)
}


export async function RemovePortfolio(formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Validate URL input
    const id = formData.get("id") as string

    const validURL = validateURL.safeParse(id)

    if (!validURL.success) {
        throw new Error(
            `${id} is an invalid ID: Make sure the URL has proper form`
        )
    }


    // selectImage() returns an empty string if the image doesn't exist.
    const checkIfImageExists = await selectImage(id, "portfolio-images")


    // If no errors occur in selectImage() and the image is not found an empty string is returned.
    if (checkIfImageExists.length > 1) {
        await deleteImage(supabase, id, "portfolio-images")
    }


    // deletePortfolio() returns 1 if the deleting process is successfull.
    const response = await deletePortfolio(supabase, id)

    if (response === 1) {
        revalidatePath("/dashboard/projects")
    } else {
        throw new Error(
            "Something went wrong while deleting your portfolio project: Try again later"
        )
    }
}