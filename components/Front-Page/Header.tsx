"use client"

import Link from "next/link"
import { Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileNav } from "./MobileNav"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"


export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Layers className="h-6 w-6" />
                    <span className="text-xl font-bold">neoSlate</span>
                </div>
                <nav className="hidden md:flex">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                How It Works
                            </Link>
                        </li>
                        <li>
                            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                Testimonials
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <SignedIn>
                        <UserButton />
                        <Button>
                            <Link href={"/dashboard"}>Dashboard</Link>
                        </Button>
                    </SignedIn>

                    <SignedOut>
                        <SignUpButton>
                            <Button className="cursor-pointer">Sign Up</Button>
                        </SignUpButton>

                        <SignInButton>
                            <Button
                                className="cursor-pointer"
                                variant={"secondary"}
                            >
                                Sign In
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}
