"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                        <span className="text-xl font-bold">neoSlate</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <nav className="flex flex-col gap-4 py-4">
                    <Link
                        href="#features"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen(false)}
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#testimonials"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen(false)}
                    >
                        Testimonials
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen(false)}
                    >
                        Pricing
                    </Link>
                </nav>
                <div className="mt-auto border-t pt-4">
                    <div className="grid gap-4">
                        <Link href="/login" className="text-center text-sm font-medium text-muted-foreground hover:text-foreground">
                            Log in
                        </Link>
                        <Button className="w-full" onClick={() => setOpen(false)}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
