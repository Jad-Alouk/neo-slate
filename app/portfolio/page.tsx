import { CreatePortfolio } from "@/actions/PortfolioActions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import PortfolioForm from "@/components/ClientSideForms/PortfolioForm"


export default function Portfolio() {
    return (
        <main className="md:h-min-screen md:flex md:justify-center md:items-center mt-5">
            <Card className="w-[90%] mx-auto">
                <CardHeader>
                    <CardTitle>New Portfolio</CardTitle>
                    <CardDescription>
                        Fill the required fields below to create a new
                        portfolio
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PortfolioForm action={CreatePortfolio} />
                </CardContent>
            </Card>
        </main>
    )
}