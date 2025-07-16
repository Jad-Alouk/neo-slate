import supabaseClient from "@/db/supabaseClient"
import supabasePublic from "@/db/supabasePublic"
import { getClerkSession } from "@/utils/clerkHelpers"

import { CreateBiz } from "@/actions/BizActions"
import BizForm from "@/components/ClientSideForms/BizForm"

import { selectOrg } from "@/db/supabase-requests/OrgRequests"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default async function Business() {
    const { token } = await getClerkSession()
    const supabase = await supabaseClient(token)
    const { label } = await selectOrg(supabase)

    const { data, error } = await supabasePublic.from("product").select("id, name").eq("org", label)

    if (error) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Something went wrong</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        Database request returned with an error
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>Make sure you are authenticated</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    return (
        <main className="md:h-min-screen md:flex md:justify-center md:items-center mt-5">
            <Card className="w-[90%] mx-auto">
                <CardHeader>
                    <CardTitle>New Business Page</CardTitle>
                    <CardDescription>
                        Fill the required fields below to create a new
                        business page
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BizForm action={CreateBiz} products={data} />
                </CardContent>
            </Card>
        </main>
    )
}