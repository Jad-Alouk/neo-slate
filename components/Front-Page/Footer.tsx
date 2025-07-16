import Link from "next/link"
import { Layers } from "lucide-react"


export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex items-center gap-2">
                    <Layers className="h-6 w-6" />
                    <span className="text-lg font-bold">neoSlate</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <nav className="flex gap-4 md:gap-6">
                        <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Features
                        </Link>
                        <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Documentation
                        </Link>
                        <Link href="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Demo
                        </Link>
                    </nav>
                </div>
                <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} neoSlate. All rights reserved.
                </p>
            </div>
        </footer>
    )
}