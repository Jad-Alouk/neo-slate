import { RemoveBlog } from "@/actions/BlogActions"
import { RemovePortfolio } from "@/actions/PortfolioActions"
import { RemoveProduct } from "@/actions/ProductActions"

import selectAllProjects from "@/db/supabase-requests/selectAllProjects"

import DeleteButtonClient from "@/components/DeleteButtonClient"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { format } from "date-fns"
import Link from "next/link"
import { Edit } from "lucide-react"
import { RemoveBiz } from "@/actions/BizActions"


export default async function ProjectsPage() {
    const allProjects = await selectAllProjects()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Projects</h1>
                <p className="text-sm text-muted-foreground md:text-base">Manage your neoSlate projects.</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex w-full flex-wrap sm:w-auto">
                    <TabsTrigger value="all" className="flex-1 sm:flex-none">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="blog" className="flex-1 sm:flex-none">
                        Blog
                    </TabsTrigger>
                    <TabsTrigger value="product" className="flex-1 sm:flex-none">
                        Product
                    </TabsTrigger>
                    <TabsTrigger value="portfolio" className="flex-1 sm:flex-none">
                        Portfolio
                    </TabsTrigger>
                    <TabsTrigger value="business" className="flex-1 sm:flex-none">
                        Business
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    {
                        allProjects.blog.length == 0
                            && allProjects.product.length == 0
                            && allProjects.portfolio.length == 0
                            && allProjects.business.length == 0
                            ? <div className="mt-5 w-full flex flex-col justify-center items-center">
                                <p className="text-xl font-bold">You have no projects yet</p>
                                <br />
                                <p>Create a new project to track its data here</p>
                            </div>
                            : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    allProjects.blog.map((item, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={item.title}
                                            type="blog"
                                            lastUpdated={format(new Date(item.created_at), "MMMM d, yyyy")}
                                            link={`/blog/edit/${item.id}`}
                                            id={item.id}
                                        />
                                    ))
                                }
                                {
                                    allProjects.product.map((item, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={item.name}
                                            type="product"
                                            lastUpdated={format(new Date(item.created_at), "MMMM d, yyyy")}
                                            link={`/product/edit/${item.id}`}
                                            id={item.id}
                                        />
                                    ))
                                }
                                {
                                    allProjects.portfolio.map((item, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={item.name}
                                            type="portfolio"
                                            lastUpdated={format(new Date(item.created_at), "MMMM d, yyyy")}
                                            link={`/portfolio/edit/${item.id}`}
                                            id={item.id}
                                        />
                                    ))
                                }
                                {
                                    allProjects.business.map((biz, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={biz.name}
                                            type="business"
                                            lastUpdated={format(new Date(biz.created_at), "MMMM d, yyyy")}
                                            link={`/business/edit/${biz.id}`}
                                            id={biz.id}
                                        />
                                    ))
                                }
                            </div>
                    }
                </TabsContent>
                <TabsContent value="blog" className="space-y-4">
                    {
                        allProjects.blog.length == 0
                            ? <div className="mt-5 w-full flex flex-col justify-center items-center">
                                <p className="text-xl font-bold">You have no blog posts published</p>
                                <br />
                                <p>Create a new blog project to track its data here</p>
                            </div>
                            : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    allProjects.blog.map((item, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={item.title}
                                            type="blog"
                                            lastUpdated={format(new Date(item.created_at), "MMMM d, yyyy")}
                                            link={`/blog/edit/${item.id}`}
                                            id={item.id}
                                        />
                                    ))
                                }
                            </div>
                    }
                </TabsContent>
                <TabsContent value="product" className="space-y-4">
                    {
                        allProjects.product.length == 0
                            ? <div className="mt-5 w-full flex flex-col justify-center items-center">
                                <p className="text-xl font-bold">You have no products deployed yet</p>
                                <br />
                                <p>Create a new product project to track its data here</p>
                            </div>
                            : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    allProjects.product.map((item, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={item.name}
                                            type="product"
                                            lastUpdated={format(new Date(item.created_at), "MMMM d, yyyy")}
                                            link={`/product/edit/${item.id}`}
                                            id={item.id}
                                        />
                                    ))
                                }
                            </div>
                    }
                </TabsContent>
                <TabsContent value="portfolio" className="space-y-4">
                    {
                        allProjects.portfolio.length == 0
                            ? <div className="mt-5 w-full flex flex-col justify-center items-center">
                                <p className="text-xl font-bold">You have not created a portfolio yet</p>
                                <br />
                                <p>Create a new portfolio project to track its data here</p>
                            </div>
                            : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    allProjects.portfolio.map((item, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={item.name}
                                            type="Portfolio"
                                            lastUpdated={format(new Date(item.created_at), "MMMM d, yyyy")}
                                            link={`/portfolio/edit/${item.id}`}
                                            id={item.id}
                                        />
                                    ))
                                }
                            </div>
                    }
                </TabsContent>
                <TabsContent value="business" className="space-y-4">
                    {
                        allProjects.business.length == 0
                            ? <div className="mt-5 w-full flex flex-col justify-center items-center">
                                <p className="text-xl font-bold">You have not created a business page yet</p>
                                <br />
                                <p>Create a new business project to track its data here</p>
                            </div>
                            : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    allProjects.business.map((biz, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={biz.name}
                                            type="Business"
                                            lastUpdated={format(new Date(biz.created_at), "MMMM d, yyyy")}
                                            link={`/business/edit/${biz.id}`}
                                            id={biz.id}
                                        />
                                    ))
                                }
                            </div>
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ProjectCard({
    title,
    type,
    lastUpdated,
    link,
    id
}: {
    title: string
    type: string
    lastUpdated: string
    link: string
    id: string
}) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{type}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    <Link href={link}>
                        <Edit className="text-green-700" size={25} />
                    </Link>

                    <form action={
                        type == "blog"
                            ? RemoveBlog
                            : type == "product"
                                ? RemoveProduct
                                : type == "portfolio"
                                    ? RemovePortfolio
                                    : type == "business"
                                        ? RemoveBiz
                                        : ""
                    }>
                        <input type="hidden" name="id" value={id} />
                        {/* <button type="submit">
                            <Delete className="text-red-700" size={20} />
                        </button> */}
                        <DeleteButtonClient itemName={title} type="icon" />
                    </form>
                </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Last updated: {lastUpdated}</CardFooter>
        </Card>
    )
}