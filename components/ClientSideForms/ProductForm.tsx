"use client"

import { useActionState } from "react"

import { Upload } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

// import { ProductError } from "@/zod/productSchema"


export default function ProductForm(
    { action }:
        { action: (_prev: unknown, formData: FormData) => Promise<{ msg: string }> } // ProductError
) {
    const [state, ProductAction, isPending] = useActionState(action, null)

    return (
        <form action={ProductAction}>
            <div className="mb-3">
                <Label htmlFor="owner">Product Owner</Label>
                <Input
                    name="owner"
                    id="owner"
                    type="text"
                    placeholder="2 -> 20 characters long"
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="name">Product Name</Label>
                <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="4 -> 50 characters long"
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="desc">Product Description</Label>
                <Input
                    name="desc"
                    id="desc"
                    type="text"
                    placeholder="Description must not exceed 200 characters"
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="quant">Available Quantity</Label>
                <Input
                    name="quant"
                    id="quant"
                    type="number"
                    placeholder="Available initial quantity"
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="price">Price</Label>
                <Input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price in $ USD"
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="contactNum">Contact Number (Optional)</Label>
                <Input
                    name="contactNum"
                    id="contactNum"
                    type="tel"
                    placeholder="123-45-768"
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                <Input
                    name="contactEmail"
                    id="contactEmail"
                    type="email"
                    placeholder="business@gmail.com"
                />
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

            <div className="w-full flex justify-center items-center">
                <Button type="submit" disabled={isPending}>
                    Deploy
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
        </form>
    )
}