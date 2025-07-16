import supabasePublic from "../supabasePublic"
import { SupabaseClient } from "@supabase/supabase-js"

import { selectOrg } from "./OrgRequests"

import { z } from "zod"
import { ParamValue } from "next/dist/server/request/params"


export const insertPortfolio = async (
    supabase: SupabaseClient<any, "public", any>,
    name: string,
    location: string,
    bio: string,
    contactInfo: {
        phone: string,
        email: string,
        website: string | null,
        linkedin: string | null,
        github: string | null
    },
    experience: string,
    education: string,
    skills: string,
    projects: string,
    languages: string,
    certifications: string,
    template: string
) => {

    const { label } = await selectOrg(supabase)

    const { data, error } = await supabase
        .from("portfolio")
        .insert({
            name,
            location,
            bio,
            contactInfo,
            experience,
            education,
            // String must be converted to an array.
            skills: skills.split(", "),
            projects,
            // String must be converted to an array.
            languages: languages.split(", "),
            certifications,
            template,
            org: label
        })
        .select("id")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while inserting the portfolio data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


// Used by serveral functions down below
const validateURL = z.string().uuid()


export const selectPortfolio = async (slug: string | ParamValue) => {
    const validURL = validateURL.safeParse(slug)

    if (!validURL.success) {
        throw new Error(
            `${slug} is an invalid ID: Make sure the URL has proper form`
        )
    }

    const { data, error } = await supabasePublic.from("portfolio").select("*").eq("id", slug).single()

    if (error) {
        throw new Error(
            "Something went wrong while fetching the portfolio data: Make sure the portfolio exists or try again later"
        )
    } else if (!data) {
        throw new Error(
            `No portfolio with ${slug} exists: Make sure you have the right URL or portfolio ID`
        )
    }

    return data
}


export const updatePortfolio = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string,
    name: string,
    location: string,
    bio: string,
    contactInfo: {
        phone: string,
        email: string,
        website: string | null,
        linkedin: string | null,
        github: string | null
    },
    experience: string,
    education: string,
    skills: string,
    projects: string,
    languages: string,
    certifications: string,
    template: string
) => {

    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { label } = await selectOrg(supabase)

    const { data, error } = await supabase
        .from("portfolio")
        .update({
            name,
            location,
            bio,
            contactInfo,
            experience,
            education,
            // String must be converted to an array.
            skills: skills.split(", "),
            projects,
            // String must be converted to an array.
            languages: languages.split(", "),
            certifications,
            template
        })
        .eq("org", label)
        .eq("id", id)
        .select("id")
        .single()

    if (error) {
        console.log(error)
        throw new Error(
            "Something went wrong while updating the portfolio data: Make sure you are authenticated or try again later"
        )
    }

    return data.id as string
}


export const deletePortfolio = async (
    supabase: SupabaseClient<any, "public", any>,
    id: string
) => {
    if (!id) {
        throw new Error(
            "Invalid URL: Make sure the URL has proper form and the ID is valid"
        )
    }

    const { error } = await supabase
        .from("portfolio")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(
            "Something went wrong while deleting your portfolio: Try again later"
        )
    }

    return 1
}