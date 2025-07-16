import supabaseClient from "@/db/supabaseClient"
import { fetchRecentProjects, getAllProjectsMetadata } from "@/utils/allProjectsRequests"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { formatDistance } from "date-fns"
import Link from "next/link"
import { selectOrg } from "@/db/supabase-requests/OrgRequests"
import { getClerkSession } from "@/utils/clerkHelpers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


export default async function Dashboard() {
    const { token } = await getClerkSession()
    const supabase = await supabaseClient(token)

    const { label } = await selectOrg(supabase)

    const projectsMetadata = await getAllProjectsMetadata(label, true)
    const { blog, product, portfolio, business } = projectsMetadata

    const recentProjects = await fetchRecentProjects()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Overview</h1>
                <p className="text-sm text-muted-foreground md:text-base">
                    {`Welcome to neoSlate. Here's an overview of your projects and activity.`}
                </p>
            </div>

            <Tabs defaultValue="projects" className="w-full">
                <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="projects" className="flex-1 sm:flex-none">
                        Projects
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1 sm:flex-none">
                        Recent Activity
                    </TabsTrigger>
                    <TabsTrigger value="others" className="flex-1 sm:flex-none">
                        See Others
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="projects" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Blog Projects</CardTitle>
                                <CardDescription>
                                    {
                                        blog.count === 1
                                            ? "You have 1 active blog project"
                                            : `You have ${blog.count} active blog projects`
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{blog.count}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Product Projects</CardTitle>
                                <CardDescription>
                                    {
                                        product.count === 1
                                            ? "You have 1 active product project"
                                            : `You have ${product.count} active porduct projects`
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{product.count}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Portfolio Projects</CardTitle>
                                <CardDescription>
                                    {
                                        portfolio.count === 1
                                            ? "You have 1 active portfolio project"
                                            : `You have ${portfolio.count} active portfolio projects`
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{portfolio.count}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Business Projects</CardTitle>
                                <CardDescription>
                                    {
                                        business.count === 1
                                            ? "You have 1 active business project"
                                            : `You have ${business.count} active business projects`
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{business.count}</div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your recent actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {
                                    blog.recent.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <Link href={`/blog/${item.id}`}>
                                                <p className="text-sm font-medium">{item.title}</p>
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    formatDistance(
                                                        item.created_at,
                                                        new Date(),
                                                        { addSuffix: true }
                                                    )
                                                }
                                            </p>
                                        </div>
                                    ))
                                }

                                {
                                    product.recent.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <Link href={`/product/${item.id}`}>
                                                <p className="text-sm font-medium">{item.name}</p>
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    formatDistance(
                                                        item.created_at,
                                                        new Date(),
                                                        { addSuffix: true }
                                                    )
                                                }
                                            </p>
                                        </div>
                                    ))
                                }

                                {
                                    portfolio.recent.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <Link href={`/portfolio/${item.id}`}>
                                                <p className="text-sm font-medium">{item.name}</p>
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    formatDistance(
                                                        item.created_at,
                                                        new Date(),
                                                        { addSuffix: true }
                                                    )
                                                }
                                            </p>
                                        </div>
                                    ))
                                }

                                {
                                    business.recent.map((biz, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <Link href={`/business/${biz.id}`}>
                                                <p className="text-sm font-medium">{biz.name}</p>
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    formatDistance(
                                                        biz.created_at,
                                                        new Date(),
                                                        { addSuffix: true }
                                                    )
                                                }
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="others" className="space-y-4">
                    <div
                        className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-5 mt-5 w-full"
                    >
                        {
                            recentProjects.recentBlogs.data?.map((blog, i) => (
                                <Card key={i} className="w-full md:w-1/4">
                                    <CardHeader>
                                        <CardTitle>{blog.title}</CardTitle>
                                        <CardDescription>written by: {blog.writer}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Avatar>
                                            <AvatarImage
                                                src={blog.avatar}
                                                alt={blog.writer}
                                                width={100}
                                                height={100}
                                                className="rounded-full"
                                            />
                                            <AvatarFallback>{blog.writer.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/${blog.org}`}>
                                            <Button>Find More</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))
                        }

                        {
                            recentProjects.recentProducts.data?.map((product, i) => (
                                <Card key={i} className="w-full md:w-1/4">
                                    <CardHeader>
                                        <CardTitle>{product.name}</CardTitle>
                                        <CardDescription>Seller: {product.owner}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Avatar>
                                            <AvatarImage
                                                src={product.avatar}
                                                alt={product.owner}
                                                width={100}
                                                height={100}
                                                className="rounded-full"
                                            />
                                            <AvatarFallback>{product.owner.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/${product.org}`}>
                                            <Button>Find More</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))
                        }

                        {
                            recentProjects.recentPortfolios.data?.map((portfolio, i) => (
                                <Card key={i} className="w-full md:w-1/4">
                                    <CardHeader>
                                        <CardTitle>{portfolio.name}</CardTitle>
                                        <CardDescription>Creator: {portfolio.name}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Avatar>
                                            <AvatarImage
                                                src={portfolio.avatar}
                                                alt={portfolio.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full"
                                            />
                                            <AvatarFallback>{portfolio.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/${portfolio.org}`}>
                                            <Button>Find More</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))
                        }

                        {
                            recentProjects.recentBiz.data?.map((biz, i) => (
                                <Card key={i} className="w-full md:w-1/4">
                                    <CardHeader>
                                        <CardTitle>{biz.name}</CardTitle>
                                        <CardDescription>Slogan: {biz.slogan}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Avatar>
                                            <AvatarImage
                                                src={biz.avatar}
                                                alt={biz.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full"
                                            />
                                            <AvatarFallback>{biz.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/${biz.org}`}>
                                            <Button>Find More</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
