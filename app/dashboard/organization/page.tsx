import supabaseClient from "@/db/supabaseClient"
import { getClerkSession } from "@/utils/clerkHelpers"
import { EditOrg, RemoveOrg } from "@/actions/OrgActions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectOrg } from "@/db/supabase-requests/OrgRequests"

import { format } from "date-fns"
import DeleteButtonClient from "@/components/DeleteButtonClient"


export default async function OrganizationPage() {
    const { token } = await getClerkSession()
    const supabase = await supabaseClient(token)

    const { label, created_at } = await selectOrg(supabase)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Organization</h1>
                <p className="text-sm text-muted-foreground md:text-base">Manage your organization settings.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Organization Details</CardTitle>
                        <CardDescription>View and update your organization information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium">Label</p>
                                <p className="text-sm text-muted-foreground">{label}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Created</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(created_at), "MMMM d, yyyy")}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Organization Label</CardTitle>
                        <CardDescription>Change the label of your organization</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={EditOrg}>
                            <Label className="mb-1" htmlFor="label">Label</Label>
                            <Input
                                name="label"
                                id="label"
                                type="text"
                                placeholder="Update your organization's label, make sure it is a unique name"
                            />
                            <div className="mt-5">
                                <Button>Update</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delete Organization</CardTitle>
                        <CardDescription>
                            Deleting your organization cannot be undone. All projects under your organization label will be deleted too.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={RemoveOrg}>
                            <input name="label" id="label" type="hidden" value={label} />
                            <div className="flex justify-center items-center">
                                <DeleteButtonClient itemName={label} type="btn" />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}