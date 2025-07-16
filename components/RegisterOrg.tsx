import { CreateOrg } from "@/actions/OrgActions"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"


const RegisterOrg = () => {
    return (
        <Card className="md:w-1/3 mx-auto my-20">
            <CardHeader>
                <CardTitle>Register Organization</CardTitle>
                <CardDescription>
                    Create your organization and give it a unique
                    label. You can have one organization to unite
                    all of your projects under one label
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={CreateOrg}>
                    <Label className="mb-1" htmlFor="label">Organization Label</Label>
                    <Input
                        name="label"
                        id="label"
                        type="text"
                        placeholder="2 -> 20 characters long and must be unique"
                    />

                    <div className="mt-5 flex justify-center items-center">
                        <Button>Submit</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default RegisterOrg