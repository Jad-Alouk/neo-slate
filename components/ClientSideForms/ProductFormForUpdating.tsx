"use client"

import { useActionState } from "react"
import Image from "next/image"

import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Upload } from "lucide-react"
import { Input } from "../ui/input"

import { ProductData } from "@/types/ProjectsDataType"
import { ParamValue } from "next/dist/server/request/params"
// import { ProductError } from "@/zod/productSchema"


export default function ProductFormForUpdating(
    {
        action,
        id,
        productData,
        imageUrl
    }:
        {
            action: (_prev: unknown, formData: FormData) => Promise<{ msg: string }> // ProductError
            id: ParamValue,
            productData: ProductData,
            imageUrl: string
        }
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
                    defaultValue={productData.owner}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="name">Product Name</Label>
                <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="4 -> 50 characters long"
                    defaultValue={productData.name}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="desc">Product Description</Label>
                <Input
                    name="desc"
                    id="desc"
                    type="text"
                    placeholder="Description must not exceed 200 characters"
                    defaultValue={productData.description}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="quant">Available Quantity</Label>
                <Input
                    name="quant"
                    id="quant"
                    type="number"
                    placeholder="Available initial quantity"
                    defaultValue={productData.quantity}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="price">Price</Label>
                <Input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price in $ USD"
                    defaultValue={productData.price}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="contactNum">Contact Number (Optional)</Label>
                <Input
                    name="contactNum"
                    id="contactNum"
                    type="tel"
                    placeholder="123-45-768"
                    defaultValue={productData.contactNum}
                />
            </div>

            <div className="mb-3">
                <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                <Input
                    name="contactEmail"
                    id="contactEmail"
                    type="email"
                    placeholder="business@gmail.com"
                    defaultValue={productData.contactEmail}
                />
            </div>

            <div className="my-5 w-full flex justify-center items-center">
                <Label htmlFor="file">
                    <Upload className="mx-auto" />
                    <span>Update Image</span>
                </Label>
                <Input
                    name="file"
                    id="file"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    hidden
                />
            </div>

            {
                id
                    ? <input name="id" id="id" type="hidden" value={id}></input>
                    : null
            }

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