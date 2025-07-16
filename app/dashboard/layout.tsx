import type React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { cachedCheckIfOrgExists } from "@/utils/orgHelpers"
import RegisterOrg from "@/components/RegisterOrg"


export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const decision = await cachedCheckIfOrgExists()

    if (!decision) {
        return (
            <RegisterOrg />
        )
    }

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                    <SidebarTrigger />
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold md:hidden">neoSlate</h1>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
