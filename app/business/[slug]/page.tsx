import { selectBiz } from "@/db/supabase-requests/BizRequests"
import { selectImage } from "@/db/supabase-requests/ImageRequests"

import ClassicTemplate from "@/components/Business-Templates/ClassicTemplate"
import CompactTemplate from "@/components/Business-Templates/CompactTemplate"
import ModernTemplate from "@/components/Business-Templates/ModernTemplate"


export default async function LiveBiz({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Get the business page data + the required image + the optional images (if they exist)
    const bizData = await selectBiz(slug)
    const image = await selectImage(bizData.id, "business-images") // Required image

    const logo = await selectImage(`logo-${bizData.id}`, "business-images") // Optional image

    // Team images have their paths stored with this format: {team member name}-{business page id}
    // We loop over each member's name and query their image
    // The query response object is then modified to have the image with its owner
    if (bizData.team && bizData.team.length > 0) {
        for (let i = 0; i < bizData.team.length; i++) {
            const image = await selectImage(`${bizData.team[i].name}-${bizData.id}`, "business-images")
            bizData.team[i].image = image
        }
    }

    if (!bizData) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Invalid URL</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        {`${slug} is not valid or business page does't exist`}
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>{`Make sure a business page with ID: ${slug} exists`}</li>
                        <li>Make sure the URL is valid and is of proper form</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    switch (typeof bizData.template === "string") {
        case bizData.template == "classic":
            return (
                <ClassicTemplate
                    logo={logo}
                    name={bizData.name}
                    slogan={bizData.slogan}
                    cta={bizData.cta}
                    description={bizData.description}
                    image={image}
                    location={bizData.location}
                    phone={bizData.phone}
                    email={bizData.email}
                    website={bizData.website}
                    links={bizData.links}
                    workingHours={bizData.working_hours}
                    team={bizData.team}
                    testimonials={bizData.testimonials}
                    productsIdArr={bizData.products}
                />
            )

        case bizData.template == "modern":
            return (
                <ModernTemplate
                    logo={logo}
                    name={bizData.name}
                    slogan={bizData.slogan}
                    cta={bizData.cta}
                    description={bizData.description}
                    image={image}
                    location={bizData.location}
                    phone={bizData.phone}
                    email={bizData.email}
                    website={bizData.website}
                    links={bizData.links}
                    workingHours={bizData.working_hours}
                    team={bizData.team}
                    testimonials={bizData.testimonials}
                    productsIdArr={bizData.products}
                />
            )

        case bizData.template == "compact":
            return (
                <CompactTemplate
                    logo={logo}
                    name={bizData.name}
                    slogan={bizData.slogan}
                    cta={bizData.cta}
                    description={bizData.description}
                    image={image}
                    location={bizData.location}
                    phone={bizData.phone}
                    email={bizData.email}
                    website={bizData.website}
                    links={bizData.links}
                    workingHours={bizData.working_hours}
                    team={bizData.team}
                    testimonials={bizData.testimonials}
                    productsIdArr={bizData.products}
                />
            )

        default:
            return (
                <ClassicTemplate
                    logo={logo}
                    name={bizData.name}
                    slogan={bizData.slogan}
                    cta={bizData.cta}
                    description={bizData.description}
                    image={image}
                    location={bizData.location}
                    phone={bizData.phone}
                    email={bizData.email}
                    website={bizData.website}
                    links={bizData.links}
                    workingHours={bizData.working_hours}
                    team={bizData.team}
                    testimonials={bizData.testimonials}
                    productsIdArr={bizData.products}
                />
            )
    }
}