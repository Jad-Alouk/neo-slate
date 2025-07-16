"use client"

import { useActionState, useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

import { ChevronsUpDown } from "lucide-react"
// import { BizError } from "@/zod/bizSchema"


export default function BizForm(
    { action, products }:
        {
            action: (_prev: unknown, formData: FormData) => Promise<{ msg: string }>, //BizError
            products: { id: string, name: string }[]
        }
) {

    // Used for a collapsible
    const [isOpen, setIsOpen] = useState(false)

    // Keeps track of the number of team members and testimonials
    // When the number is updated the number of inputs changes to get all needed info
    const [teamMembersCount, setTeamMembersCount] = useState(1)
    const [testimonialsCount, setTestimonialsCount] = useState(1)

    const [state, BizAction, isPending] = useActionState(action, null)

    return (
        <>
            <form className="flex flex-col justify-center items-center" action={BizAction}>

                <div className="w-full flex flex-col md:flex-row justify-center items-center mb-3">
                    <Label className="mr-1 my-1" htmlFor="logo">{`Business Logo (Optional)`}</Label>
                    <Input
                        name="logo"
                        id="logo"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                    />
                </div>

                <div className="w-full flex flex-col justify-center items-center my-5 gap-5">

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="name">Business Name</Label>
                        <Input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="2 -> 20 characters long"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="slogan">Slogan</Label>
                        <Input
                            name="slogan"
                            id="slogan"
                            type="text"
                            placeholder="2 -> 50 characters long"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="cta">Call To Action</Label>
                        <Input
                            name="cta"
                            id="cta"
                            type="text"
                            placeholder="2 -> 30 characters long"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="description">Description</Label>
                        <Input
                            name="description"
                            id="description"
                            type="text"
                            placeholder="10 -> 200 characters long"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-center items-center mb-3">
                    <Label className="mr-1 my-1">{`Image (Required)`}</Label>
                    <Input name="image" id="image" type="file" accept="image/png, image/jpeg, image/webp" />
                </div>

                <div className="w-full flex flex-col justify-center items-center my-5 gap-5">

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="location">Location</Label>
                        <Input
                            name="location"
                            id="location"
                            type="text"
                            placeholder="New York, USA... (4 -> 50 characters long)"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="phone">Phone Number</Label>
                        <Input
                            name="phone"
                            id="phone"
                            type="text"
                            placeholder="123-45-678"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="email">Email Address</Label>
                        <Input
                            name="email"
                            id="email"
                            type="text"
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="website">{`Website (Optional)`}</Label>
                        <Input
                            name="website"
                            id="website"
                            type="text"
                            placeholder="example.io"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="facebook">{`Facebook (Optional)`}</Label>
                        <Input
                            name="facebook"
                            id="facebook"
                            type="text"
                            placeholder="https://facebook/example"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="twitter">{`Twitter (Optional)`}</Label>
                        <Input
                            name="twitter"
                            id="twitter"
                            type="text"
                            placeholder="https://x/example"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="instagram">{`Instagram (Optional)`}</Label>
                        <Input
                            name="instagram"
                            id="instagram"
                            type="text"
                            placeholder="https://instagram/example"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="linkedin">{`Linkedin (Optional)`}</Label>
                        <Input
                            name="linkedin"
                            id="linkedin"
                            type="text"
                            placeholder="https://linkedin/example"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <Label className="mr-1 my-1" htmlFor="workingHours">Working Hours</Label>
                        <Input
                            name="workingHours"
                            id="workingHours"
                            type="text"
                            placeholder="9AM - 5PM: Monday - Friday"
                        />
                    </div>
                </div>

                {/*
                    The teamMembersCount is a number saved in state, an array of size equal to it
                    is created and looped over to conditionally render as many input fields needed
                */}
                {Array(teamMembersCount).fill(0).map((_, i) => (
                    <div key={i} className="w-full flex flex-col justify-center items-center my-5 gap-5">
                        <div className="w-full flex flex-col">
                            <Label
                                className="mr-1 my-1" htmlFor="memberName"
                            >
                                {`Team Member ${i + 1}`}
                            </Label>

                            <Input
                                name="memberName"
                                id="memberName"
                                type="text"
                                placeholder="John Smith... 20 characters max"
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <Label className="mr-1 my-1" htmlFor="role">Team Role</Label>
                            <Input
                                name="memberRole"
                                id="memberRole"
                                type="text"
                                placeholder="CEO... 15 characters max"
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <Label
                                className="mr-1 my-1"
                                htmlFor="memberImage"
                            >
                                {`Profile Photo (Optional)`}
                            </Label>

                            <Input
                                name="memberImage"
                                id="memberImage"
                                type="file" accept="image/png, image/jpeg, image/webp"
                            />
                        </div>
                    </div>
                ))}
                <div className="w-1/2 md:w-1/4 flex justify-center items-center gap-3">
                    <Button
                        type="button"
                        onClick={() => setTeamMembersCount(teamMembersCount + 1)}
                    >
                        Add More Members
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setTeamMembersCount(teamMembersCount - 1)}
                        disabled={teamMembersCount == 1}
                    >
                        Remove A Member
                    </Button>
                </div>

                {/*
                    The testimonialsCount is a number saved in state, an array of size equal to it
                    is created and looped over to conditionally render as many input fields needed
                */}
                {Array(testimonialsCount).fill(0).map((_, i) => (
                    <div key={i} className="w-full flex flex-col justify-center items-center my-5 gap-5">
                        <div className="w-full flex flex-col">
                            <Label className="mr-1 my-1" htmlFor="reviewer">
                                {`Reviewer Name ${i + 1}`}
                            </Label>

                            <Input
                                name="reviewer"
                                id="reviewer"
                                type="text"
                                placeholder="John Doe... 20 characters max"
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <Label className="mr-1 my-1" htmlFor="review">Review</Label>

                            <Input
                                name="review"
                                id="review"
                                type="text"
                                placeholder="200 characters max"
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <Label className="mr-1 my-1" htmlFor="rating">Rating</Label>
                            <Input
                                name="rating"
                                id="rating"
                                type="text"
                                placeholder="Preferably out of 5... 4.5/5"
                            />
                        </div>
                    </div>
                ))}
                <div className="w-1/2 md:w-1/4 flex justify-center items-center gap-3">
                    <Button
                        type="button"
                        onClick={() => setTestimonialsCount(testimonialsCount + 1)}
                    >
                        Add Testimonials
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setTestimonialsCount(testimonialsCount - 1)}
                        disabled={testimonialsCount == 1}
                    >
                        Remove A Testimonial
                    </Button>
                </div>

                <div className="mx-auto w-1/3 flex flex-col justify-center items-center gap-3 my-10">
                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="w-[250px] md:w-[350px] space-y-2"
                    >
                        <div className="flex items-center justify-between space-x-4 px-4">
                            <h4 className="text-sm font-semibold">
                                Choose Products
                            </h4>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDown className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                            Include products you have deployed.
                        </div>
                        <CollapsibleContent className="space-y-2">
                            {
                                products && products.length > 0
                                    ? products.map((product, i) => (
                                        <div
                                            className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm
                                        flex justify-start items-center gap-1"
                                            key={i}
                                        >
                                            <Checkbox name="products" id="products" value={product.id} />
                                            <Label
                                                htmlFor="products"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {product.name}
                                            </Label>
                                        </div>
                                    ))
                                    : <div
                                        className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm text-center"
                                    >
                                        You have no products yet. Finish this project and create some products later.
                                    </div>
                            }
                        </CollapsibleContent>
                    </Collapsible>

                    <Select name="template">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="compact">Compact</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                >
                    Go Public
                </Button>
            </form>

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
        </>
    )
}