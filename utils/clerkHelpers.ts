import { currentUser } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"


export const getClerkAvatar = async () => {
    const user = await currentUser()

    if (!user) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    if (user.imageUrl) {
        const avatar = user.imageUrl
        return avatar
    }
    return null
}


export const getClerkSession = async () => {
    const { userId, getToken } = await auth()

    if (!userId) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }


    // Clerk template is used to authenticate db requests through clerk jwt's.
    // This token is passed to the supabaseClient() function to use it in the req header.
    const token = await getToken({ template: "supabase" })

    if (!token) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    return { userId, token }
}