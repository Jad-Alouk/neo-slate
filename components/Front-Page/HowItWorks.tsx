export function HowItWorks() {
    return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            How It Works
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple by Design</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            neoSlate is designed to be simple to use and easy to understand.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                    <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            1
                        </div>
                        <h3 className="text-xl font-bold">Create</h3>
                        <p className="text-muted-foreground">Define your content models and create your content.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            2
                        </div>
                        <h3 className="text-xl font-bold">Manage</h3>
                        <p className="text-muted-foreground">Organize and manage your content with ease.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            3
                        </div>
                        <h3 className="text-xl font-bold">Publish</h3>
                        <p className="text-muted-foreground">Publish your content to any platform or device.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
