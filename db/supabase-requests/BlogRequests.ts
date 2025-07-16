import { SupabaseClient } from "@supabase/supabase-js"
import supabasePublic from "../supabasePublic"
import { getClerkAvatar } from "@/utils/clerkHelpers"

import { selectOrg } from "./OrgRequests"

import { z } from "zod"
import { ParamValue } from "next/dist/server/request/params"


export const insertBlog = async (
    supabase: SupabaseClient<any, "public", any>,
    title: string,
    writer: string,
    sanitizedPost: string,
    template: string,
    titleFont: string,
    bodyFont: string,
    category: string,
    instagram: string,
    twitter: string,
    linkedin: string
) => {

    const avatar = await getClerkAvatar()
    const { label } = await selectOrg(supabase)

    const { data, error } = await supabase
        .from("blog")
        .insert({
            title,
            writer,
            post: sanitizedPost,
            template,
            category,
            fonts: [titleFont, bodyFont],
            avatar,
            links: [instagram, twitter, linkedin],
            org: label
        })
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while inserting the blog post data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


// Used by several functions down below
const validateURL = z.string().uuid()


export const selectBlog = async (slug: string | ParamValue) => {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const { data, error } = await supabasePublic.from("blog").select("*").eq("id", slug).single()

    if (error) {
        throw new Error(
            "Something went wrong while fetching the blog post data: Make sure the blog post exists or try again later"
        )
    } else if (!data) {
        throw new Error(
            `No blog post with ${slug} exists: Make sure you have the right URL or blog ID`
        )
    }

    return data
}


export const updateBlog = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string,
    title: string,
    writer: string,
    sanitizedPost: string,
    template: string,
    titleFont: string,
    bodyFont: string,
    category: string,
    instagram: string,
    twitter: string,
    linkedin: string
) => {

    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const avatar = await getClerkAvatar()
    const { label } = await selectOrg(supabase)

    const { data, error } = await supabase
        .from("blog")
        .update({
            title,
            writer,
            post: sanitizedPost,
            template,
            category,
            fonts: [titleFont, bodyFont],
            avatar,
            links: [instagram, twitter, linkedin]
        })
        .eq("org", label)
        .eq("id", id)
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while updating the blog post data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


export const deleteBlog = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string
) => {
    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { error } = await supabase
        .from("blog")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(
            "Something went wrong while deleting your blog post: Try again later"
        )
    }

    return 1
}