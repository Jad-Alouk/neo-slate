"use server"

import { getClerkSession } from "@/utils/clerkHelpers"

import { deleteOrg, insertOrg, selectOrg, updateOrg } from "@/db/supabase-requests/OrgRequests"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import supabaseClient from "@/db/supabaseClient"


// Used by several functions down below
const orgLabelSchema = z.string().min(2).max(15)


export async function CreateOrg(formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Validate receieved label
    const label = formData.get("label") as string
    const validOrgLabel = orgLabelSchema.safeParse(label)

    if (!validOrgLabel.success) {
        throw new Error(
            "Invalid label: Follow the instructions to make sure you are inserting the required data"
        )
    }


    // The db query
    const response = await insertOrg(supabase, userId, label)

    if (response.label) {
        revalidatePath("/dashboard")
    } else {
        throw new Error(
            "Something went wrong while creating your organization: Try again later"
        )
    }
}


export async function EditOrg(formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Validate receieved label
    const label = formData.get("label") as string
    const validOrgLabel = orgLabelSchema.safeParse(label)

    if (!validOrgLabel.success) {
        throw new Error(
            "Invalid label: Follow the instructions to make sure you are inserting the required data"
        )
    }


    // The db query
    const response = await updateOrg(supabase, userId, label)

    if (response.label) {
        revalidatePath("/dashboard/organization")
    } else {
        throw new Error(
            "Something went wrong while updating your organization: Try again later"
        )
    }
}


export async function RemoveOrg(formData: FormData) {

    // Authentication + Authorized db connection
    const { userId, token } = await getClerkSession()

    if (!userId || !token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Validate received label
    const confirmationLabel = formData.get("label") as string
    const validOrgLabel = orgLabelSchema.safeParse(confirmationLabel)

    if (!validOrgLabel.success) {
        throw new Error(
            "Invalid label: Follow the instructions to make sure you are inserting the required data"
        )
    }


    // Redundant: Making sure that a user can only delete their own org
    const { label } = await selectOrg(supabase)

    if (validOrgLabel.data != label) {
        throw new Error(
            "Wrong label: You can only delete your own organization"
        )
    }


    // The db query
    const response = await deleteOrg(supabase, userId, validOrgLabel.data)

    if (response === 1) {
        revalidatePath("/dashboard/organization")
    } else {
        throw new Error(
            "Something went wrong while deleting your organization: Try again later"
        )
    }
}