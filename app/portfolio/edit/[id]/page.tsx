import PortfolioFormForUpdating from "@/components/ClientSideForms/PortfolioFormForUpdating"

import { EditPortfolio } from "@/actions/PortfolioActions"
import { selectPortfolio } from "@/db/supabase-requests/PortfolioRequests"

import { selectImage } from "@/db/supabase-requests/ImageRequests"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default async function PortfolioEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Get the portfolio data + portfolio image
    const portfolioData = await selectPortfolio(id)
    const imageUrl = await selectImage(id, "portfolio-images")

    if (!portfolioData) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Invalid URL</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        {`${id} is not valid or portfolio does't exist`}
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>{`Make sure a porfolio with ID: ${id} exists`}</li>
                        <li>Make sure the URL is valid and is of proper form</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    return (
        <Card className="w-[90%] mx-auto">
            <CardHeader>
                <CardTitle>Update Portfolio</CardTitle>
                <CardDescription>
                    Update the fields you would like to be changed and
                    make sure your data meets the requirements
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PortfolioFormForUpdating
                    action={EditPortfolio}
                    portfolioData={portfolioData}
                    imageUrl={imageUrl}
                    id={id}
                />
            </CardContent>
        </Card>
    )
}