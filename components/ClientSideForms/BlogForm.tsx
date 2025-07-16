"use client"

import { useActionState } from "react"
import TextEditor from "../TextEditor"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { PlusCircle, Upload } from "lucide-react"
// import { BlogError } from "@/zod/blogSchema"


export default function BlogForm(
    { action }:
        { action: (_prev: unknown, formData: FormData) => Promise<{ msg: string }> } // BlogError
) {
    const [state, BlogAction, isPending] = useActionState(action, null)

    return (
        <form action={BlogAction}>
            <div
                className="w-full flex flex-col md:flex-row justify-center items-center mb-3"
            >
                <Label className="md:mr-1 my-1 md:my-0" htmlFor="title">Title</Label>
                <Input
                    name="title"
                    id="title"
                    type="text"
                    className="md:mr-3 mb-2 md:mb-0"
                    placeholder="4 -> 50 characters long"
                />

                <Label className="md:mr-1 my-1 md:my-0" htmlFor="writer">Writer</Label>
                <Input
                    name="writer"
                    id="writer"
                    type="text"
                    placeholder="2 -> 20 characters long"
                />
            </div>

            <TextEditor
                id={"text"}
                placeholder={
                    "Enter your post here... (Text must be at least 200 characters long)"
                }
                savedPost={null}
            />

            <div className="w-full flex flex-col md:flex-row justify-evenly items-center my-3">
                <Select name="titleFont">
                    <SelectTrigger className="w-[180px] my-1 md:my-0">
                        <SelectValue placeholder="Font type for title" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cursive">Cursive</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="monospace">Monospace</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="sans-serif">Sans-Serif</SelectItem>
                    </SelectContent>
                </Select>

                <Select name="bodyFont">
                    <SelectTrigger className="w-[180px] my-1 md:my-0">
                        <SelectValue placeholder="Font type for post" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cursive">Cursive</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="monospace">Monospace</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="sans-serif">Sans-Serif</SelectItem>
                    </SelectContent>
                </Select>

                <Select name="template">
                    <SelectTrigger className="w-[180px] my-1 md:my-0">
                        <SelectValue placeholder="Template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="clean">Clean</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="magazine">Magazine</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="energetic">Energetic</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                </Select>

                <Select name="category">
                    <SelectTrigger className="w-[180px] my-1 md:my-0">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/*
                Full width is given for some screens smaller than sm ( > 640px) like iPhone SE
                and Pixel 7.
            */}

            <div className="w-full sm:w-1/2 mx-auto my-5 flex flex-col justify-start items-center gap-3">
                <div className="flex justify-center items-center gap-1 my-5">
                    <Label htmlFor="file">
                        <Upload className="mx-auto" />
                        <span>Upload An Image</span>
                        <span>{`(Optional)`}</span>
                    </Label>
                    <Input
                        name="file"
                        id="file"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        hidden
                    />
                </div>

                <span className="font-semibold">Optional</span>

                <div className="flex justify-center items-center gap-1">
                    <Label htmlFor="instagram">
                        <PlusCircle />
                    </Label>
                    <Input
                        name="instagram"
                        id="instagram"
                        type="text"
                        placeholder="Instagram Link"
                    />
                </div>

                <div className="flex justify-center items-center gap-1">
                    <Label htmlFor="twitter">
                        <PlusCircle />
                    </Label>
                    <Input
                        name="twitter"
                        id="twitter"
                        type="text"
                        placeholder="Twitter Link"
                    />
                </div>

                <div className="flex justify-center items-center gap-1">
                    <Label htmlFor="linkedin">
                        <PlusCircle />
                    </Label>
                    <Input
                        name="linkedin"
                        id="linkedin"
                        type="text"
                        placeholder="Linkedin Link"
                    />
                </div>

                <div className="flex justify-center items-center">
                    <Button type="submit" disabled={isPending}>
                        Submit
                    </Button>
                </div>

                <div>
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
                </div>
            </div>
        </form>
    )
}