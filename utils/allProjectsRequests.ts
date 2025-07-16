import supabasePublic from "@/db/supabasePublic"


// Fetches the five most recent projects to display in dashboard -> overview
export const fetchRecentProjects = async () => {

    // Helper function to write less code
    const fetcher = async (table: string) => {
        return supabasePublic
            .from(table)
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })
            .limit(5)
    }

    const [recentBlogs, recentProducts, recentPortfolios, recentBiz] = await Promise.all([
        fetcher("blog"),
        fetcher("product"),
        fetcher("portfolio"),
        fetcher("business")
    ])

    return {
        recentBlogs: {
            data: recentBlogs.data,
            count: recentBlogs.count
        },
        recentProducts: {
            data: recentProducts.data,
            count: recentProducts.count
        },
        recentPortfolios: {
            data: recentPortfolios.data,
            count: recentPortfolios.count
        },
        recentBiz: {
            data: recentBiz.data,
            count: recentBiz.count
        }
    }
}


/*
    Helper function to write less code:
        - Table: To select a specific project type.
        - Label: To fetch from a specific org.
        - Limit: To either fetch everything related to an org or just some projects.
*/
export const fetchMetadata = async (table: string, label: string, limit: boolean) => {
    if (limit) {
        return supabasePublic
            .from(table)
            .select("*", { count: "exact" })
            .eq("org", label)
            .order("created_at", { ascending: false })
            .limit(3)
    } else {
        return supabasePublic
            .from(table)
            .select("*", { count: "exact" })
            .eq("org", label)
            .order("created_at", { ascending: false })
    }
}


// Used after authorization
export const getAllProjectsMetadata = async (org: string, limit: boolean) => {

    /*
        A specific org label is passed.
        limit ? fetches few projects : fetches all projects
    */
    const [blogReq, productReq, portfolioReq, bizReq] = await Promise.all([
        fetchMetadata("blog", org, limit),
        fetchMetadata("product", org, limit),
        fetchMetadata("portfolio", org, limit),
        fetchMetadata("business", org, limit)
    ])

    if (blogReq.error || productReq.error || portfolioReq.error || bizReq.error) {
        throw new Error(
            "Something went wrong while connecting to the database: Try again later"
        )
    }

    return {
        blog: {
            count: blogReq.count,
            recent: blogReq.data
        },
        product: {
            count: productReq.count,
            recent: productReq.data
        },
        portfolio: {
            count: portfolioReq.count,
            recent: portfolioReq.data
        },
        business: {
            count: bizReq.count,
            recent: bizReq.data
        },
    }
}