import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function GuidePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Guide</h1>
                <p className="text-sm text-muted-foreground md:text-base">Learn how to use neoSlate CMS effectively.</p>
            </div>

            <Tabs defaultValue="getting-started" className="w-full">
                <TabsList className="flex w-full flex-wrap sm:w-auto">
                    <TabsTrigger value="getting-started" className="flex-1 sm:flex-none">
                        Getting Started
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="flex-1 sm:flex-none">
                        Projects
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="getting-started" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to neoSlate</CardTitle>
                            <CardDescription>A quick introduction to the CMS</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">What is neoSlate?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    neoSlate is a lightweight CMS designed for creating and managing different types of content projects
                                    including blogs, product catalogs, and portfolios.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">Key Features</h3>
                                <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>Simple and intuitive interface</li>
                                    <li>Multiple project types (Blog, Product, Portfolio)</li>
                                    <li>Customizable templates</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">First Steps</h3>
                                <ol className="list-decimal pl-5 text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>{`Create your first project using the "New Project" button`}</li>
                                    <li>Choose a project type (Blog, Product, or Portfolio)</li>
                                    <li>Customize your project settings</li>
                                    <li>Start adding content</li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="projects" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Working with Projects</CardTitle>
                            <CardDescription>Learn how to create and manage different project types</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Blog Projects</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Blog projects are ideal for creating and managing blog posts, articles, and news content.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">Product Projects</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Product projects help you create and manage product catalogs with features like pricing and inventory management.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">Portfolio Projects</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Portfolio projects are designed for showcasing work, projects, or case studies.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
