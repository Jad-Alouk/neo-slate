"use client"

import { useActionState } from "react"

import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { convertArrayToString } from "@/utils/formattingHelpers"
import { PortfolioData } from "@/types/ProjectsDataType"

import { Upload } from "lucide-react"
// import { PortfolioError } from "@/zod/portfolioSchema"
import TextEditor from "../TextEditor"


export default function PortfolioFormForUpdating(
    {
        action,
        portfolioData,
        id
    }:
        {
            action: (_prev: unknown, formData: FormData) => Promise<{ msg: string }> // PortfolioError
            portfolioData: PortfolioData
            imageUrl: string
            id: string
        }
) {

    const [state, PortfolioAction, isPending] = useActionState(action, null)

    return (
        <form action={PortfolioAction}>
            <div className="mb-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="John Smith..."
                    defaultValue={portfolioData.name}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="location">Location</Label>
                <Input
                    name="location"
                    id="location"
                    type="text"
                    placeholder="New York, USA..."
                    defaultValue={portfolioData.location}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="bio">Bio</Label>
                <Input
                    name="bio"
                    id="bio"
                    type="text"
                    placeholder="Brief bio about yourself..."
                    defaultValue={portfolioData.bio}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    name="phone"
                    id="phone"
                    type="text"
                    placeholder="123-45-678"
                    defaultValue={portfolioData.contactInfo.phone}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="example@gmail.co,"
                    defaultValue={portfolioData.contactInfo.email}
                />
            </div>

            {
                id
                    ? <input name="paramsId" id="paramsId" type="hidden" value={id}></input>
                    : null
            }

            <div className="mb-3">
                <Label htmlFor="website">{`Website (optional)`}</Label>
                <Input
                    name="website"
                    id="website"
                    type="text"
                    placeholder="example.io..."
                    defaultValue={portfolioData.contactInfo.website}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="linkedin">{`Linkedin (optional)`}</Label>
                <Input
                    name="linkedin"
                    id="linkedin"
                    type="text"
                    placeholder="https://linkedin/example.com"
                    defaultValue={portfolioData.contactInfo.linkedin}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="github">{`Github (optional)`}</Label>
                <Input
                    name="github"
                    id="github"
                    type="text"
                    placeholder="https://github/example.com"
                    defaultValue={portfolioData.contactInfo.github}
                />
            </div>

            <div className="mb-3">
                <TextEditor
                    id={"experience"}
                    placeholder=""
                    savedPost={portfolioData.experience}
                />
            </div>

            <div className="mb-3">
                <TextEditor
                    id={"education"}
                    placeholder=""
                    savedPost={portfolioData.education}
                />
            </div>

            <div className="mb-3">
                <TextEditor
                    id={"projects"}
                    placeholder=""
                    savedPost={portfolioData.projects}
                />
            </div>

            <div className="mb-3">
                <TextEditor
                    id={"certifications"}
                    placeholder=""
                    savedPost={portfolioData.certifications}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="skills">Skills</Label>
                <Input
                    name="skills"
                    id="skills"
                    type="text"
                    placeholder="critical thinking, team leader... (Make sure to add a comma after each skill)"
                    defaultValue={convertArrayToString(portfolioData.skills)}
                />
            </div>


            <div className="mb-3">
                <Label htmlFor="languages">Languages</Label>
                <Input
                    name="languages"
                    id="languages"
                    type="text"
                    placeholder="Arabic(Native), English(Fluent)... (Make sure to add a comma after each language)"
                    defaultValue={convertArrayToString(portfolioData.languages)}
                />
            </div>

            <div>
                <Select
                    name="template"
                    defaultValue={portfolioData.template}
                >
                    <SelectTrigger className="w-[180px] my-1 md:my-0">
                        <SelectValue placeholder="Template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="timeline">Timeline</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="my-5 w-full flex justify-center items-center">
                <Label htmlFor="file">
                    <Upload className="mx-auto" />
                    <span>Upload An Image (Required)</span>
                </Label>
                <Input
                    name="file"
                    id="file"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    hidden
                />
            </div>

            <div className="flex justify-center items-center">
                <Button type="submit" disabled={isPending}>
                    Update
                </Button>
            </div>

            {
                state && state.msg
                    ? JSON.parse(state.msg)
                        .map((err: { path: string[], message: string }, i: number) => (
                            <div className="w-full" key={i}>
                                <p className="text-center">
                                    <span className="text-lg text-red-700">{err.path[0]}: </span>
                                    <span className="text-green-700">{err.message}</span>
                                </p>
                            </div>
                        ))
                    : null
            }
        </form>
    )
}