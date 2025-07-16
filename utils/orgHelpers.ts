import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "./clerkHelpers"
import { SupabaseErrorCodes } from "@/types/SupabaseErrorCodes"
import { cache } from "react"


export const checkIfOrgExists = async () => {

    // Authentication + Authorized db connection
    const { token } = await getClerkSession()

    if (!token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    const supabase = await supabaseClient(token)


    // Org creators can access only their own org
    const { data, error } = await supabase
        .from("organization")
        .select("*")
        .single()

    if (error) {
        switch (typeof error.code === "string") {

            // Record is NOT found
            case error.code == "PGRST116":
                return false

            case error.code == "42501":
                throw new Error(
                    "User is NOT authorized to perform the request: Make sure you are properly signed in / signed up to be authenticated"
                )

            default:
                throw new Error(
                    "Something went wrong while connecting to the database: Try again later"
                )
        }
    } else if (!data) {

        /*
            Redundant check: 
            if we get data == null, error code PGRST116 would be returned in the error object, a condition we check for in the switch statement above.
        */
        return false
    }

    return true
}

// The return value is cached for optimizing dashboard navigation
export const cachedCheckIfOrgExists = cache(checkIfOrgExists)


export const handleOrgError = (errorCode: SupabaseErrorCodes) => {

    switch (typeof errorCode.code === "string") {
        case errorCode.code == "PGRST116":
            throw new Error(
                "User is NOT authorized to perform the request: Register an organization first or try again later"
            )

        case errorCode.code == "PGRST204":
            throw new Error(
                "User is NOT authorized to perform the request: Make sure you are inserting the required input"
            )

        case errorCode.code == "23505":
            throw new Error(
                "Organization data is NOT unique: User can register one organization only or make sure you organization label is unique"
            )

        case errorCode.code == "42501":
            throw new Error(
                "User is NOT authorized to perform the request: Make sure you are properly signed in / signed up to be authenticated"
            )

        default:
            throw new Error(
                "Something went wrong while connecting to the database: Try again later"
            )
    }
}