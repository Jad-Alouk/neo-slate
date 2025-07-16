import { Code, Database, Zap } from "lucide-react"


export function Features() {
    return (
        <section id="features" className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need, All In One Place</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            neoSlate provides all the essential features of a modern CMS without the bloat.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                    <div className="grid gap-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Lightning Fast</h3>
                        <p className="text-muted-foreground">
                            Optimized for speed and performance, neoSlate loads in milliseconds, not seconds.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Code className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Developer Friendly</h3>
                        <p className="text-muted-foreground">
                            Built with modern technologies and APIs that developers love to work with.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Database className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Flexible Content</h3>
                        <p className="text-muted-foreground">
                            Structure your content your way with a flexible and intuitive content model.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
