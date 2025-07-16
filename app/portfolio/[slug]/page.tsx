import { selectPortfolio } from "@/db/supabase-requests/PortfolioRequests"
import { selectImage } from "@/db/supabase-requests/ImageRequests"

import PortfolioMinimal from "@/components/Portfolio-Templates/MinimalTemplate"
import PortfolioModern from "@/components/Portfolio-Templates/ModernTemplate"
import PortfolioTimeline from "@/components/Portfolio-Templates/TimelineTemplate"


export default async function LivePortfolio({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Get the portfolio data + portfolio image
    const portfolioData = await selectPortfolio(slug)
    const image = await selectImage(portfolioData.id, "portfolio-images")

    if (!portfolioData) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Invalid URL</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        {`${slug} is not valid or portfolio does't exist`}
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>{`Make sure a portfolio with ID: ${slug} exists`}</li>
                        <li>Make sure the URL is valid and is of proper form</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    switch (typeof portfolioData.template === "string") {
        case portfolioData.template == "modern":
            return (
                <PortfolioModern
                    profileImage={image}
                    name={portfolioData.name}
                    location={portfolioData.location}
                    bio={portfolioData.bio}
                    contactInfo={portfolioData.contactInfo}
                    experience={portfolioData.experience}
                    education={portfolioData.education}
                    skills={portfolioData.skills}
                    projects={portfolioData.projects}
                    languages={portfolioData.languages}
                    certifications={portfolioData.certifications}
                />
            )

        case portfolioData.template == "minimal":
            return (
                <PortfolioMinimal
                    profileImage={image}
                    name={portfolioData.name}
                    location={portfolioData.location}
                    bio={portfolioData.bio}
                    contactInfo={portfolioData.contactInfo}
                    experience={portfolioData.experience}
                    education={portfolioData.education}
                    skills={portfolioData.skills}
                    projects={portfolioData.projects}
                    languages={portfolioData.languages}
                    certifications={portfolioData.certifications}
                />
            )

        case portfolioData.template == "timeline":
            return (
                <PortfolioTimeline
                    profileImage={image}
                    name={portfolioData.name}
                    location={portfolioData.location}
                    bio={portfolioData.bio}
                    contactInfo={portfolioData.contactInfo}
                    experience={portfolioData.experience}
                    education={portfolioData.education}
                    skills={portfolioData.skills}
                    projects={portfolioData.projects}
                    languages={portfolioData.languages}
                    certifications={portfolioData.certifications}
                />
            )

        default:
            return (
                <PortfolioModern
                    profileImage={image}
                    name={portfolioData.name}
                    location={portfolioData.location}
                    bio={portfolioData.bio}
                    contactInfo={portfolioData.contactInfo}
                    experience={portfolioData.experience}
                    education={portfolioData.education}
                    skills={portfolioData.skills}
                    projects={portfolioData.projects}
                    languages={portfolioData.languages}
                    certifications={portfolioData.certifications}
                />
            )
    }
}