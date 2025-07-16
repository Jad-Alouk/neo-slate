"use client"

import TextEditor from "../TextEditor"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import Image from "next/image"
import { ParamValue } from "next/dist/server/request/params"

import { BlogData } from "@/types/ProjectsDataType"

import { PlusCircle, Upload } from "lucide-react"
import { useActionState } from "react"
// import { BlogError } from "@/zod/blogSchema"


export default function BlogFormForUpdating(
    {
        action,
        paramsId,
        blogData,
        imageUrl
    }:
        {
            action: (_prev: unknown, formData: FormData) => Promise<{ msg: string }>, // BlogError
            paramsId: ParamValue,
            blogData: BlogData,
            imageUrl: string
        }
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
                    defaultValue={blogData.title}
                />

                <Label className="md:mr-1 my-1 md:my-0" htmlFor="writer">Writer</Label>
                <Input
                    name="writer"
                    id="writer"
                    type="text"
                    placeholder="2 -> 20 characters long"
                    defaultValue={blogData.writer}
                />
            </div>

            <TextEditor
                id={"text"}
                placeholder={
                    "Enter your post here... (Text must be at least 200 characters long)"
                }
                savedPost={blogData.post}
            />

            <div className="w-full flex flex-col md:flex-row justify-evenly items-center my-3">
                <Select
                    name="titleFont"
                    defaultValue={blogData.fonts && blogData.fonts[0] ? blogData.fonts[0] : ""}
                >
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

                <Select
                    name="bodyFont"
                    defaultValue={blogData.fonts && blogData.fonts[1] ? blogData.fonts[1] : ""}
                >
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

                <Select
                    name="template"
                    defaultValue={blogData.template}
                >
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

                <Select
                    name="category"
                    defaultValue={blogData.category}
                >
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
                Full width is given for some screens smaller than sm (> 640px) like iPhone SE
                and Pixel 7.
            */}

            <div className="w-full sm:w-1/2 mx-auto my-5 flex flex-col justify-start items-center gap-3">
                <div className="flex justify-center items-center gap-1 my-5">
                    <Label htmlFor="file">
                        <Upload className="mx-auto" />
                        <span>Update Image</span>
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
                        defaultValue={blogData.links && blogData.links[0] ? blogData.links[0] : ""}
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
                        defaultValue={blogData.links && blogData.links[1] ? blogData.links[1] : ""}
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
                        defaultValue={blogData.links && blogData.links[2] ? blogData.links[2] : ""}
                    />
                </div>
            </div>

            {/*
                paramsId is extracted in the parent component through the dynamic route, then it is
                passed down here and saved in a hidden input for the server action to pick it up
                and use it to locate the record required for updating.
            */}

            {
                paramsId
                    ? <input name="paramsId" id="paramsId" type="hidden" value={paramsId}></input>
                    : null
            }

            {/*
                Image uploading is optional for blog posts, so we check if the imageUrl exists and if the
                length > 0 becuase the selectImage() return an empty string in case the image doesn't exist.
            */}

            {
                imageUrl && imageUrl.length > 0
                    ? <Image
                        className="mx-auto mb-3"
                        src={imageUrl}
                        alt="Current Image"
                        width={100}
                        height={100}
                    />
                    : null
            }

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