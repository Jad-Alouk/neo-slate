"use server"

import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"

import { deleteProduct, insertProduct } from "@/db/supabase-requests/ProductRequests"
import { selectProduct } from "@/db/supabase-requests/ProductRequests"
import { updateProduct } from "@/db/supabase-requests/ProductRequests"

import { deleteImage, selectImage, uploadImage } from "@/db/supabase-requests/ImageRequests"
import { updateImage } from "@/db/supabase-requests/ImageRequests"

import { z } from "zod"
import { productSchema } from "@/zod/productSchema"

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

export async function CreateProduct(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Form data is receieved, validated and sanitized
    const owner = formData.get("owner") as string
    const name = formData.get("name") as string
    const description = formData.get("desc") as string
    const quantity = Number(formData.get("quant") as string)
    const price = Number(formData.get("price") as string)
    const contactNum = formData.get("contactNum") as string
    const contactEmail = formData.get("contactEmail") as string
    const file = formData.get("file") as File

    const validProduct = productSchema.safeParse({
        owner,
        name,
        description,
        quantity,
        price,
        contactNum,
        contactEmail
    })

    if (!validProduct.success) {
        // return validProduct.error
        return { msg: validProduct.error.message }
    }


    // Image uploading is not optional for products, user must provide an image of the product.
    if (file.size == 0) {
        throw new Error(
            "Invalid product data: An image must be provided to display the product"
        )
    } else {
        if (validProduct.data.contactEmail.length === 0 && validProduct.data.contactNum.length === 0) {
            throw new Error(
                "Invalid contact info: You must provide at least a contact number or a contact email"
            )
        }


        // The db query
        const response = await insertProduct(
            supabase,
            validProduct.data.owner,
            validProduct.data.name,
            validProduct.data.description,
            validProduct.data.quantity,
            validProduct.data.price,
            validProduct.data.contactNum,
            validProduct.data.contactEmail
        )


        // The response is an id that is used as the image path.
        await uploadImage(supabase, file, response, "product-images")
        redirect(`/product/${response}`)
    }
}


// Used by several functions down below
const validateURL = z.string().uuid()


// Redundant function. Fetching products should be a public operation and no server action is needed.
// selectProduct() should be used instead. The logic will be kept here in case of future need.
export async function FetchProduct(slug: string | ParamValue) {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const response = await selectProduct(slug)

    return response
}


export async function EditProduct(_prev: unknown, formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Form data is receieved, validated and sanitized
    const owner = formData.get("owner") as string
    const name = formData.get("name") as string
    const description = formData.get("desc") as string
    const quantity = Number(formData.get("quant") as string)
    const price = Number(formData.get("price") as string)
    const contactNum = formData.get("contactNum") as string
    const contactEmail = formData.get("contactEmail") as string
    const file = formData.get("file") as File
    const id = formData.get("id") as string

    const validURL = validateURL.safeParse(id)

    if (!validURL.success) {
        throw new Error(
            `${id} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const validProduct = productSchema.safeParse({
        owner,
        name,
        description,
        quantity,
        price,
        contactNum,
        contactEmail
    })

    if (!validProduct.success) {
        // return validProduct.error
        return { msg: validProduct.error.message }
    }

    if (validProduct.data.contactEmail.length === 0 && validProduct.data.contactNum.length === 0) {
        throw new Error(
            "Invalid contact info: You must provide at least a contact number or a contact email"
        )
    }


    // The db query
    const response = await updateProduct(
        supabase,
        validURL.data,
        validProduct.data.owner,
        validProduct.data.name,
        validProduct.data.description,
        validProduct.data.quantity,
        validProduct.data.price,
        validProduct.data.contactNum,
        validProduct.data.contactEmail
    )


    // Image uploading is optional for updating, user can keep old images.
    // The response is an id that is used as the image path.
    if (file.size > 0) {
        await updateImage(supabase, file, response, "product-images")
    }

    redirect(`/product/${response}`)
}


export async function RemoveProduct(formData: FormData) {

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
    const checkIfImageExists = await selectImage(id, "product-images")


    // If no errors occur in selectImage() and the image is not found an empty string is returned.
    if (checkIfImageExists.length > 1) {
        await deleteImage(supabase, id, "product-images")
    }


    // deleteProduct() returns 1 if the deleting process is successfull.
    const response = await deleteProduct(supabase, id)

    if (response === 1) {
        revalidatePath("/dashboard/projects")
    } else {
        throw new Error(
            "Something went wrong while deleting your product project: Try again later"
        )
    }
}