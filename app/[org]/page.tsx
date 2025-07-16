import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import supabasePublic from "@/db/supabasePublic"
import { getAllProjectsMetadata } from "@/utils/allProjectsRequests"
import Image from "next/image"
import Link from "next/link"


export default async function Org({ params }: { params: Promise<{ org: string }> }) {
    const { org } = await params
    const allProjects = await getAllProjectsMetadata(org.split("%20").join(" "), false)

    return (
        <main className="flex flex-col md:flex-row justify-evenly items-center flex-wrap gap-1">
            {
                allProjects.blog.recent.map((item, index) => {
                    const src = supabasePublic.storage.from("blog-images").getPublicUrl(item.id).data.publicUrl

                    return (
                        <Card className="md:w-1/4 my-5" key={index}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>Written by: {item.writer}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={src}
                                    alt="Blog Image"
                                    width={150}
                                    height={150}
                                    className="mx-auto"
                                />

                                <div className="flex justify-center items-center mt-3">
                                    <Link href={`/blog/${item.id}`}>Read More</Link>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            }

            {
                allProjects.product.recent.map((item, index) => {
                    const src = supabasePublic.storage.from("product-images").getPublicUrl(item.id).data.publicUrl

                    return (
                        <Card className="md:w-1/4 my-5" key={index}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>Seller: {item.owner}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={src}
                                    alt="Porduct Image"
                                    width={150}
                                    height={150}
                                    className="mx-auto"
                                />

                                <div className="flex justify-center items-center mt-3">
                                    <Link href={`/product/${item.id}`}>Find More</Link>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </main>
    )
}