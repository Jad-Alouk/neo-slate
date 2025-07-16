import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"

import BizFormForUpdating from "@/components/ClientSideForms/BizFormForUpdating"

import { selectOrg } from "@/db/supabase-requests/OrgRequests"
import { selectBiz } from "@/db/supabase-requests/BizRequests"
import { EditBiz } from "@/actions/BizActions"

import { selectImage } from "@/db/supabase-requests/ImageRequests"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default async function BizEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Establish an authorized connection to the db
    // Fetch all products under org label
    // Products data is passed to the form for the user to pick and choose what to include
    const { token } = await getClerkSession()
    const supabase = await supabaseClient(token)
    const { label } = await selectOrg(supabase)
    const { data, error } = await supabase.from("product").select("id, name").eq("org", label)

    // Get the business page data + the required image + the optional images (if they exist)
    const bizData = await selectBiz(id)
    const image = await selectImage(bizData.id, "business-images") // Required image

    const logo = await selectImage(`logo-${bizData.id}`, "business-images") // Optional image

    // Team images have their paths stored with this format: {team member name}-{business page id}
    // We loop over each member's name and query their image
    // The query response object is then modified to have the image with its owner
    if (bizData.team && bizData.team.length > 0) {
        for (let i = 0; i < bizData.team.length; i++) {
            const image = await selectImage(`${bizData.team[i].name}-${bizData.id}`, "business-images")
            bizData.team[i].image = image
        }
    }

    if (error || !bizData) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Invalid URL</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        {`${id} is not valid or business page does't exist`}
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>{`Make sure a business page with ID: ${id} exists`}</li>
                        <li>Make sure the URL is valid and is of proper form</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    return (
        <Card className="w-[90%] mx-auto">
            <CardHeader>
                <CardTitle>Update Business Page</CardTitle>
                <CardDescription>
                    Update the fields you would like to be changed and
                    make sure your data meets the requirements
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BizFormForUpdating
                    action={EditBiz}
                    paramsId={id}
                    products={data}
                    bizData={bizData}
                    imageUrl={image}
                    logoUrl={logo}
                />
            </CardContent>
        </Card>
    )
}