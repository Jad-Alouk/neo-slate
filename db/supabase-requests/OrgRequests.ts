import { SupabaseClient } from "@supabase/supabase-js"
import { handleOrgError } from "@/utils/orgHelpers"


export const insertOrg = async (
    supabase: SupabaseClient<any, "public", any>,
    userId: string,
    label: string
) => {
    if (!userId || !supabase) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    if (!label) {
        throw new Error(
            "Organization label is empty or invalid: Provide proper organization label"
        )
    }

    const { data, error } = await supabase
        .from("organization")
        .insert({
            label,
            manager: userId
        })
        .select("label")
        .single()

    if (error) {
        throw new Error(
            "Something went wrong while creating your organization: Make sure you are authenticated or try again later"
        )
    }

    return data
}

export const selectOrg = async (supabase: SupabaseClient<any, "public", any>) => {
    const { data, error } = await supabase.from("organization").select("created_at, label").single()

    if (error) {
        return handleOrgError(error)
    }

    return data
}

export const updateOrg = async (
    supabase: SupabaseClient<any, "public", any>,
    userId: string,
    label: string
) => {
    const { data, error } = await supabase.from("organization").update({
        label
    })
        .eq("manager", userId)
        .select("label")
        .single()

    if (error) {
        return handleOrgError(error)
    }

    return data
}

export const deleteOrg = async (
    supabase: SupabaseClient<any, "public", any>,
    userId: string,
    label: string
) => {
    const { error } = await supabase
        .from("organization")
        .delete()
        .eq("label", label)
        .eq("manager", userId)

    if (error) {
        return handleOrgError(error)
    }

    return 1
}