import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPrivateRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/blog',
    '/blog/edit(.*)',
    '/product',
    '/product/edit(.*)',
    '/portfolio',
    '/portfolio/edit(.*)',
    '/business',
    '/business/edit(.*)'
])

export default clerkMiddleware(async (auth, req) => {
    if (isPrivateRoute(req)) {
        await auth.protect()
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};