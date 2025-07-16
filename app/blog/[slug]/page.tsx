import { selectBlog } from "@/db/supabase-requests/BlogRequests"
import { selectImage } from "@/db/supabase-requests/ImageRequests"

import CleanTemplate from "@/components/Blog-Templates/CleanTemplate"
import CardTemplate from "@/components/Blog-Templates/CardTemplate"
import MagazineTemplate from "@/components/Blog-Templates/MagazineTemplate"
import ProfessionalTemplate from "@/components/Blog-Templates/ProfessionalTemplate"
import EnergeticTemplate from "@/components/Blog-Templates/EnergeticTemplate"
import SocialTemplate from "@/components/Blog-Templates/SocialTemplate"


export default async function LiveBlog({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Get the blog data + blog image (if it exists)
    const blogData = await selectBlog(slug)
    const image = await selectImage(blogData.id, "blog-images")

    if (!blogData) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Invalid URL</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        {`${slug} is not valid or blog post does't exist`}
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>{`Make sure a blog post with ID: ${slug} exists`}</li>
                        <li>Make sure the URL is valid and is of proper form</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    switch (typeof blogData.template === "string") {
        case blogData.template == "clean":
            return (
                <CleanTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )

        case blogData.template == "card":
            return (
                <CardTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )

        case blogData.template == "magazine":
            return (
                <MagazineTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )

        case blogData.template == "professional":
            return (
                <ProfessionalTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )

        case blogData.template == "energetic":
            return (
                <EnergeticTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )

        case blogData.template == "social":
            return (
                <SocialTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )

        default:
            return (
                <CleanTemplate
                    publishDate={blogData.created_at}
                    title={blogData.title}
                    writer={blogData.writer}
                    post={blogData.post}
                    category={blogData.category}
                    fonts={blogData.fonts}
                    avatar={blogData.avatar}
                    links={blogData.links}
                    backgroundImg={image}
                />
            )
    }
}