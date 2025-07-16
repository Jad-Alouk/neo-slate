"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, ChevronDown, FileText, Home, LayoutDashboard, LayoutGrid, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar"
import { UserButton, useUser } from "@clerk/nextjs"


export function DashboardSidebar() {
    const { user } = useUser()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
        <Sidebar>
            <SidebarHeader className="border-b py-4">
                <div className="flex items-center px-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <LayoutDashboard className="h-4 w-4" />
                        </div>
                        <span className="text-xl font-bold">neoSlate</span>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <div className="px-4 py-4">
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full justify-start gap-2">
                                <Plus className="h-4 w-4" />
                                <span>New Project</span>
                                <ChevronDown className="ml-auto h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]">
                            <DropdownMenuItem asChild>
                                <Link href="/blog" className="flex items-center gap-2 cursor-pointer">
                                    <FileText className="h-4 w-4" />
                                    <span>Blog</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/product" className="flex items-center gap-2 cursor-pointer">
                                    <LayoutGrid className="h-4 w-4" />
                                    <span>Product</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/portfolio" className="flex items-center gap-2 cursor-pointer">
                                    <Users className="h-4 w-4" />
                                    <span>Portfolio</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/business" className="flex items-center gap-2 cursor-pointer">
                                    <Users className="h-4 w-4" />
                                    <span>Business</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Overview">
                            <Link href="/dashboard">
                                <Home className="h-4 w-4" />
                                <span>Overview</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/organization")} tooltip="Organization">
                            <Link href="/dashboard/organization">
                                <Users className="h-4 w-4" />
                                <span>Organization</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/projects")} tooltip="Projects">
                            <Link href="/dashboard/projects">
                                <LayoutGrid className="h-4 w-4" />
                                <span>Projects</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/guide")} tooltip="Guide">
                            <Link href="/dashboard/guide">
                                <BookOpen className="h-4 w-4" />
                                <span>Guide</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <div className="flex justify-start items-center gap-2 text-sm leading-tight">
                    <UserButton />
                    <span className="truncate font-medium">{user?.fullName}</span>
                </div>
                <span className="truncate text-xs text-muted-foreground">
                    {user?.emailAddresses[0].emailAddress}
                </span>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
