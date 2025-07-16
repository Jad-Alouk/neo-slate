"use server"

import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"

import { deleteBiz, insertBiz, updateBiz } from "@/db/supabase-requests/BizRequests"
import { deleteImage, selectImage, updateImage, uploadImage } from "@/db/supabase-requests/ImageRequests"

import { z } from "zod"
import { bizSchema } from "@/zod/bizSchema"

import { convertBusinessDataToObjects } from "@/utils/formattingHelpers"

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

export async function CreateBiz(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Media files
    const image = formData.get("image") as File // Required
    const logo = formData.get("logo") as File // Optional
    const memberImages = formData.getAll("memberImage") as File[] // Optional

    // Input values
    const name = formData.get("name") as string
    const slogan = formData.get("slogan") as string
    const cta = formData.get("cta") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const website = formData.get("website") as string
    const facebook = formData.get("facebook") as string
    const twitter = formData.get("twitter") as string
    const instagram = formData.get("instagram") as string
    const linkedin = formData.get("linkedin") as string
    const workingHours = formData.get("workingHours") as string
    const products = formData.getAll("products") as string[]
    const template = formData.get("template") as string

    // Input values as string[] because multiple team members might be created
    const membersNames = formData.getAll("memberName") as string[]
    const membersRoles = formData.getAll("memberRole") as string[]

    // Input values as string[] because multiple testimonials might be created
    const reviewers = formData.getAll("reviewer") as string[]
    const reviews = formData.getAll("review") as string[]
    const ratings = formData.getAll("rating") as string[]


    // Stores social media links as an object named links
    // Maps each team member name to his/her role
    // Maps each reviewer to his/her review
    const { links, team, testimonials } = convertBusinessDataToObjects(
        facebook,
        twitter,
        instagram,
        linkedin,
        membersNames,
        membersRoles,
        reviewers,
        reviews,
        ratings
    )


    // Validate form data
    const validBiz = bizSchema.safeParse({
        name,
        slogan,
        cta,
        description,
        location,
        phone,
        email,
        website,
        links,
        workingHours,
        team,
        testimonials,
        products,
        template
    })

    if (!validBiz.success) {
        // return validBiz.error
        return { msg: validBiz.error.message }
    }


    // Image uploading is not optional for the business photo, user must provide an image of the building/location.
    if (image.size == 0) {
        throw new Error(
            "Invalid business data: An image must be provided to display in the business page"
        )
    }


    // The db query
    const response = await insertBiz(
        supabase,
        validBiz.data.name,
        validBiz.data.slogan,
        validBiz.data.cta,
        validBiz.data.description,
        validBiz.data.location,
        validBiz.data.phone,
        validBiz.data.email,
        validBiz.data.website,
        validBiz.data.links,
        validBiz.data.workingHours,
        validBiz.data.team,
        validBiz.data.testimonials,
        validBiz.data.template,
        validBiz.data.products
    )


    // Checked the image before the db query becuase it is required to have it.
    // Uploaded it after the db query because we need the db response first.
    // The response is an id that is used as the image path
    await uploadImage(supabase, image, response, "business-images")

    // Image uploading is optional for the logo.
    // The response is an id that is used as the image path with the keyword "logo".
    if (logo.size > 0) {
        await uploadImage(supabase, logo, `logo-${response}`, "business-images")
    }

    // Loops over every team member image and assigns the name of that member to his/her image.
    if (memberImages.length > 0 && memberImages[0].size > 0) {
        for (let i = 0; i < memberImages.length; i++) {
            await uploadImage(
                supabase,
                memberImages[i],
                `${membersNames[i]}-${response}`,
                "business-images"
            )
        }
    }

    redirect(`/business/${response}`)
}


// Used by several functions down below
const validateURL = z.string().uuid()


export async function EditBiz(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Media files
    const image = formData.get("image") as File // Required
    const logo = formData.get("logo") as File // Optional
    const memberImages = formData.getAll("memberImage") as File[] // Optional

    // Input values
    const name = formData.get("name") as string
    const slogan = formData.get("slogan") as string
    const cta = formData.get("cta") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const website = formData.get("website") as string
    const facebook = formData.get("facebook") as string
    const twitter = formData.get("twitter") as string
    const instagram = formData.get("instagram") as string
    const linkedin = formData.get("linkedin") as string
    const workingHours = formData.get("workingHours") as string
    const products = formData.getAll("products") as string[]
    const template = formData.get("template") as string

    const id = formData.get("paramsId") as string // ID to identify the specific record

    // Input values as string[] because multiple teams might be created
    const membersNames = formData.getAll("memberName") as string[]
    const membersRoles = formData.getAll("memberRole") as string[]

    // Input values as string[] because multiple testimonials might be created
    const reviewers = formData.getAll("reviewer") as string[]
    const reviews = formData.getAll("review") as string[]
    const ratings = formData.getAll("rating") as string[]


    // Stores social media links as an object named links
    // Maps each team member name to his/her role
    // Maps each reviewer to his/her review
    const { links, team, testimonials } = convertBusinessDataToObjects(
        facebook,
        twitter,
        instagram,
        linkedin,
        membersNames,
        membersRoles,
        reviewers,
        reviews,
        ratings
    )


    // Validate form data
    const validBiz = bizSchema.safeParse({
        name,
        slogan,
        cta,
        description,
        location,
        phone,
        email,
        website,
        links,
        workingHours,
        team,
        testimonials,
        products,
        template
    })

    if (!validBiz.success) {
        // return validBiz.error
        return { msg: validBiz.error.message }
    }


    // The db query
    const response = await updateBiz(
        supabase,
        id,
        validBiz.data.name,
        validBiz.data.slogan,
        validBiz.data.cta,
        validBiz.data.description,
        validBiz.data.location,
        validBiz.data.phone,
        validBiz.data.email,
        validBiz.data.website,
        validBiz.data.links,
        validBiz.data.workingHours,
        validBiz.data.team,
        validBiz.data.testimonials,
        validBiz.data.template,
        validBiz.data.products
    )


    // Updating any image is optional

    // Don't check if the image is saved in the db because it is required
    // Check if there is new image to update
    if (image.size > 0) {
        await updateImage(supabase, image, response, "business-images")
    }


    // Check if there is a logo submitted
    // Check if there is an old logo, if found update it
    // If no logo found, then just upload the submitted logo
    if (logo.size > 0) {
        const checkIfLogoExists = await selectImage(`logo-${id}`, "business-images")

        if (checkIfLogoExists.length > 1) {
            await updateImage(supabase, logo, `logo-${response}`, "business-images")
        } else {
            await uploadImage(supabase, logo, `logo-${response}`, "business-images")
        }
    }


    // Loop over every member image
    // Check if there is an image, if size == 0 skip
    // If there is an image to be submitted, we check if its owner already has one saved in db
    // Owner has an image saved in db ? update the image : upload the image
    for (let i = 0; i < membersNames.length; i++) {

        if (memberImages[i].size > 0) {
            const checkIfMemberImageExists = await selectImage(
                `${membersNames[i]}-${id}`, "business-images"
            )

            if (checkIfMemberImageExists.length > 1) {
                await updateImage(supabase, memberImages[i], `${membersNames[i]}-${id}`, "business-images")
            } else {
                await uploadImage(supabase, memberImages[i], `${membersNames[i]}-${id}`, "business-images")
            }
        }
    }

    redirect(`/business/${response}`)
}


export async function RemoveBiz(formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Validate id
    const id = formData.get("id") as string

    const validURL = validateURL.safeParse(id)

    if (!validURL.success) {
        throw new Error(
            `${id} is an invalid ID: Make sure the URL has proper form`
        )
    }


    // Image is required when creating a business page, so we don't check if it exists first, just delete
    await deleteImage(supabase, id, "business-images")

    // Logo is optional, so we check if it exists before delete
    const checkIfLogoExists = await selectImage(`logo-${id}`, "business-images")

    if (checkIfLogoExists.length > 1) {
        await deleteImage(supabase, `logo-${id}`, "business-images")
    }

    // Fetch all team member names to get their images
    const { data, error } = await supabase
        .from("business")
        .select("team")
        .eq("id", id)


    if (error) {
        throw new Error(
            "Something went wrong while fetching important data for deleting your business page: Try again later"
        )
    }

    // data object looks like this: data = [ { team: [ {name: "...", role: "..."}... ] } ]
    // Loop over every name, check if that name has an image, then delete it
    for (let i = 0; i < data[0].team.length; i++) {

        const checkIfMemberImageExists = await selectImage(
            `${data[0].team[i].name}-${id}`, "business-images"
        )

        if (checkIfMemberImageExists.length > 1) {
            await deleteImage(supabase, `${data[0].team[i].name}-${id}`, "business-images")
        }
    }


    // deleteBiz() returns 1 if the deleting process is successfull.
    const response = await deleteBiz(supabase, id)


    if (response === 1) {
        revalidatePath("/dashboard/projects")
    } else {
        throw new Error(
            "Something went wrong while deleting your business page: Try again later"
        )
    }
}