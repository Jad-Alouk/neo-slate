import { ArrowRight, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export function Hero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                The Modern CMS for the Modern Web
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                neoSlate is a lightweight, simple, and modern content management system designed for students, freelancers and small businesses.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href={"/dashboard"}>
                                <Button className="cursor-pointer" size="lg">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href={"/blog/37272a18-fcfc-4914-ae3a-69f02bfc4585"}>
                                <Button
                                    className="cursor-pointer"
                                    size="lg"
                                    variant="outline"
                                >
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative h-[350px] w-full overflow-hidden rounded-lg border bg-background p-2 shadow-lg md:h-[400px] lg:h-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-background/20">
                                <div className="flex h-full flex-col items-center justify-center p-4">
                                    <Layers className="h-16 w-16 text-primary" />
                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-bold">neoSlate Dashboard</h3>
                                        <p className="text-sm text-muted-foreground">Simple. Modern. Powerful.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
