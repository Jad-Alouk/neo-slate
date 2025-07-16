import { CreateBlog } from "@/actions/BlogActions"
import BlogForm from "@/components/ClientSideForms/BlogForm"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function Blog() {
    return (
        <main className="md:h-min-screen md:flex md:justify-center md:items-center mt-5">
            <Card className="w-[90%] mx-auto">
                <CardHeader>
                    <CardTitle>New Blog Post</CardTitle>
                    <CardDescription>
                        Fill the required fields below to create a new
                        blog post
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BlogForm action={CreateBlog} />
                </CardContent>
            </Card>
        </main>
    )
}