import { SupabaseClient } from "@supabase/supabase-js"
import supabasePublic from "../supabasePublic"

import { selectOrg } from "./OrgRequests"

import { z } from "zod"
import { ParamValue } from "next/dist/server/request/params"


export const insertBiz = async (
    supabase: SupabaseClient<any, "public", any>,
    name: string,
    slogan: string,
    cta: string,
    description: string,
    location: string,
    phone: string,
    email: string,
    website: string | null,
    links: {
        facebook: string | null,
        twitter: string | null,
        instagram: string | null,
        linkedin: string | null
    },
    workingHours: string,
    team: { name: string | null, role: string | null }[],
    testimonials: { name: string | null, text: string | null, rating: number | null }[],
    template: string,
    products: string[] | null
) => {
    const { label } = await selectOrg(supabase)

    type LinkKey = keyof typeof links
    let nullCounterForLinks = 0
    for (const key of Object.keys(links) as LinkKey[]) {
        const value = links[key]
        if (typeof value === "string" && value.length === 0) {
            nullCounterForLinks++
        }
    }

    const { data, error } = await supabase
        .from("business")
        .insert({
            name,
            slogan,
            cta,
            description,
            location,
            phone,
            email,
            website: website && website.length == 0 ? null : website,
            links: nullCounterForLinks == 4 ? null : links,
            working_hours: workingHours,
            team: team && team.length == 1 && team[0].name == "" && team[0].role == "" ? null : team,
            testimonials:
                testimonials &&
                    testimonials.length == 1 &&
                    testimonials[0].name == "" &&
                    testimonials[0].text == ""
                    ? null : testimonials,
            template,
            products: products && (products.length == 0 || products[0].length == 0) ? null : products,
            org: label
        })
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while inserting the business data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


// Used by several functions down below
const validateURL = z.string().uuid()


export const selectBiz = async (slug: string | ParamValue) => {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const { data, error } = await supabasePublic.from("business").select("*").eq("id", slug).single()

    if (error) {
        throw new Error(
            "Something went wrong while fetching the business page data: Make sure the page exists or try again later"
        )
    } else if (!data) {
        throw new Error(
            `No business page with ${slug} exists: Make sure you have the right URL or ID`
        )
    }

    return data
}


export const updateBiz = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string,
    name: string,
    slogan: string,
    cta: string,
    description: string,
    location: string,
    phone: string,
    email: string,
    website: string | null,
    links: {
        facebook: string | null,
        twitter: string | null,
        instagram: string | null,
        linkedin: string | null
    },
    workingHours: string,
    team: { name: string | null, role: string | null }[],
    testimonials: { name: string | null, text: string | null, rating: number | null }[],
    template: string,
    products: string[] | null
) => {

    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { label } = await selectOrg(supabase)

    type LinkKey = keyof typeof links
    let nullCounterForLinks = 0
    for (const key of Object.keys(links) as LinkKey[]) {
        const value = links[key]
        if (typeof value === "string" && value.length === 0) {
            nullCounterForLinks++
        }
    }

    const { data, error } = await supabase
        .from("business")
        .update({
            name,
            slogan,
            cta,
            description,
            location,
            phone,
            email,
            website,
            links: nullCounterForLinks == 4 ? null : links,
            working_hours: workingHours,
            team: team && team.length == 1 && team[0].name == "" && team[0].role == "" ? null : team,
            testimonials:
                testimonials &&
                    testimonials.length == 1 &&
                    testimonials[0].name == "" &&
                    testimonials[0].text == ""
                    ? null : testimonials,
            template,
            products
        })
        .eq("org", label)
        .eq("id", id)
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while updating the business page data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


export const deleteBiz = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string
) => {
    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { error } = await supabase
        .from("business")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(
            "Something went wrong while deleting your business page: Try again later"
        )
    }

    return 1
}