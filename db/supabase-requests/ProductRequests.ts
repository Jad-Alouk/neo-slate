import supabasePublic from "../supabasePublic"
import { SupabaseClient } from "@supabase/supabase-js"

import { selectOrg } from "./OrgRequests"

import { z } from "zod"
import { ParamValue } from "next/dist/server/request/params"


export const insertProduct = async (
    supabase: SupabaseClient<any, "public", any>,
    owner: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    contactNum: string,
    contactEmail: string
) => {

    const { label } = await selectOrg(supabase)

    const { data, error } = await supabase
        .from("product")
        .insert({
            owner,
            name,
            description,
            quantity,
            price,
            // Empty strings must be converted to null
            contactNum: contactNum.length == 0 ? null : contactNum,
            contactEmail: contactEmail.length == 0 ? null : contactEmail,
            org: label
        })
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while inserting the product data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


// Used by several functions down below
const validateURL = z.string().uuid()


export const selectProduct = async (slug: string | ParamValue) => {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const { data, error } = await supabasePublic.from("product").select("*").eq("id", slug).single()

    if (error) {
        throw new Error(
            "Something went wrong while fetching the product data: Make sure the product exists or try again later"
        )
    } else if (!data) {
        throw new Error(
            `No product with ${slug} exists: Make sure you have the right URL or product ID`
        )
    }

    return data
}


export const updateProduct = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string,
    owner: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    contactNum: string,
    contactEmail: string
) => {

    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { label } = await selectOrg(supabase)

    const { data, error } = await supabase
        .from("product")
        .update({
            owner,
            name,
            description,
            quantity,
            price,
            // Empty strings must be converted to null
            contactNum: contactNum.length == 0 ? null : contactNum,
            contactEmail: contactEmail.length == 0 ? null : contactEmail
        })
        .eq("org", label)
        .eq("id", id)
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while updating the product data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


export const deleteProduct = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string
) => {
    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { error } = await supabase
        .from("product")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(
            "Something went wrong while deleting your product: Try again later"
        )
    }

    return 1
}