import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export function CTA() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Join thousands of developers and content creators who are already using neoSlate.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href={"/dashboard"}>
                            <Button className="cursor-pointer" size="lg">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>

                        <Link href={"/docs"}>
                            <Button
                                className="cursor-pointer"
                                size="lg"
                                variant="outline"
                            >
                                View Documentation
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
