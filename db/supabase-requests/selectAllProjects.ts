import supabaseClient from "../supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"

import { handleOrgError } from "@/utils/orgHelpers"

import { AllProjectsDataType } from "@/types/ProjectsDataType"


const selectAllProjects = async () => {
    const { token } = await getClerkSession()
    const supabase = await supabaseClient(token)

    const { data, error }: { data: unknown, error: any } = await supabase
        .from("organization")
        .select(`label, blog ("*"), product ("*"), portfolio ("*"), business ("*")`)
        .single()

    if (error) {
        handleOrgError(error)
    }

    if (!data) {
        throw new Error(
            "Something went wrong while fetching your projects: Try again later"
        )
    }

    return data as AllProjectsDataType
}

export default selectAllProjects