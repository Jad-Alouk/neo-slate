"use server"

import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"

import { deleteBlog, insertBlog } from "@/db/supabase-requests/BlogRequests"
import { selectBlog } from "@/db/supabase-requests/BlogRequests"
import { updateBlog } from "@/db/supabase-requests/BlogRequests"

import { deleteImage, selectImage, uploadImage } from "@/db/supabase-requests/ImageRequests"
import { updateImage } from "@/db/supabase-requests/ImageRequests"

import { z } from "zod"
import { blogSchema } from "@/zod/blogSchema"
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

export async function CreateBlog(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Form data is receieved, validated and sanitized
    const title = formData.get("title") as string
    const writer = formData.get("writer") as string
    const post = formData.get("text") as string
    const template = formData.get("template") as string
    const titleFont = formData.get("titleFont") as string
    const bodyFont = formData.get("bodyFont") as string
    const category = formData.get("category") as string
    const file = formData.get("file") as File
    const instagram = formData.get("instagram") as string
    const twitter = formData.get("twitter") as string
    const linkedin = formData.get("linkedin") as string

    const sanitizedPost = sanitize(post)

    const validBlog = blogSchema.safeParse({
        title,
        writer,
        post: sanitizedPost,
        template,
        titleFont,
        bodyFont,
        category,
        instagram,
        twitter,
        linkedin
    })

    if (!validBlog.success) {
        // return validBlog.error
        return { msg: validBlog.error.message }
    }


    // The db query
    const response = await insertBlog(
        supabase,
        validBlog.data.title,
        validBlog.data.writer,
        sanitizedPost,
        validBlog.data.template,
        validBlog.data.titleFont,
        validBlog.data.bodyFont,
        validBlog.data.category,
        validBlog.data.instagram,
        validBlog.data.twitter,
        validBlog.data.linkedin
    )


    // Image uploading is optional for blog posts.
    // The response is an id that is used as the image path.
    if (file.size > 0) {
        await uploadImage(supabase, file, response, "blog-images")
    }

    redirect(`/blog/${response}`)
}


// Used by several functions down below
const validateURL = z.string().uuid()


// Redundant function. Fetching blog posts should be a public operation and no server action is needed.
// selectBlog() should be used instead. The logic will be kept here in case of future need.
export async function FetchBlog(slug: string | ParamValue) {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const response = await selectBlog(slug)

    return response
}


export async function EditBlog(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Form data is receieved, validated and sanitized
    const title = formData.get("title") as string
    const writer = formData.get("writer") as string
    const post = formData.get("text") as string
    const template = formData.get("template") as string
    const titleFont = formData.get("titleFont") as string
    const bodyFont = formData.get("bodyFont") as string
    const category = formData.get("category") as string
    const paramsId = formData.get("paramsId") as string
    const file = formData.get("file") as File
    const instagram = formData.get("instagram") as string
    const twitter = formData.get("twitter") as string
    const linkedin = formData.get("linkedin") as string

    const validURL = validateURL.safeParse(paramsId)

    if (!validURL.success) {
        throw new Error(
            `${paramsId} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const sanitizedPost = sanitize(post)

    const validBlog = blogSchema.safeParse({
        title,
        writer,
        post: sanitizedPost,
        template,
        titleFont,
        bodyFont,
        category,
        instagram,
        twitter,
        linkedin
    })

    if (!validBlog.success) {
        // return validBlog.error
        return { msg: validBlog.error.message }
    }


    // The db query
    const response = await updateBlog(
        supabase,
        validURL.data,
        validBlog.data.title,
        validBlog.data.writer,
        sanitizedPost,
        validBlog.data.template,
        validBlog.data.titleFont,
        validBlog.data.bodyFont,
        validBlog.data.category,
        validBlog.data.instagram,
        validBlog.data.twitter,
        validBlog.data.linkedin
    )


    // The response is an id that is used as the image path.
    if (file.size > 0) {
        await updateImage(supabase, file, response, "blog-images")
    }

    redirect(`/blog/${response}`)
}


export async function RemoveBlog(formData: FormData) {

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


    // selectImage() returns an empty string if the image doesn't exist.
    const checkIfImageExists = await selectImage(id, "blog-images")


    // If no errors occur in selectImage() and the image is not found an empty string is returned.
    if (checkIfImageExists.length > 1) {
        await deleteImage(supabase, id, "blog-images")
    }


    // deleteBlog() returns 1 if the deleting process is successfull.
    const response = await deleteBlog(supabase, id)

    if (response === 1) {
        revalidatePath("/dashboard/projects")
    } else {
        throw new Error(
            "Something went wrong while deleting your blog project: Try again later"
        )
    }
}