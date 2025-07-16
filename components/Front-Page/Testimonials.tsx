import { User } from "lucide-react"


export function Testimonials() {
    return (
        <section id="testimonials" className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Developers</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            See what others are saying about neoSlate.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col justify-between rounded-lg border bg-background p-6">
                        <div className="space-y-2">
                            <p className="text-muted-foreground">
                                {`"neoSlate has completely changed how I build websites for my clients. It's fast, flexible, and
                                incredibly easy to use."`}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center space-x-2">
                            <User />
                            <div>
                                <p className="text-sm font-medium">Alex Johnson</p>
                                <p className="text-xs text-muted-foreground">Frontend Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between rounded-lg border bg-background p-6">
                        <div className="space-y-2">
                            <p className="text-muted-foreground">
                                {`"The simplicity of neoSlate is its greatest strength. It does exactly what I need without getting in the
                                way."`}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center space-x-2">
                            <User />
                            <div>
                                <p className="text-sm font-medium">Sarah Miller</p>
                                <p className="text-xs text-muted-foreground">Content Strategist</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between rounded-lg border bg-background p-6 md:col-span-2 lg:col-span-1">
                        <div className="space-y-2">
                            <p className="text-muted-foreground">
                                {`"I've used many CMS platforms over the years, but neoSlate stands out for its performance and developer
                                experience."`}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center space-x-2">
                            <User />
                            <div>
                                <p className="text-sm font-medium">Michael Chen</p>
                                <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
