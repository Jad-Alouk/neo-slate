export interface BlogData {
    id: string
    created_at: Date
    title: string
    writer: string
    post: string
    template: string
    category: string
    fonts: string[]
    avatar?: string
    links?: string[]
    org: string
}

export interface BlogTemplateProps {
    publishDate: Date
    title: string
    writer: string
    post: string
    category: string
    fonts: string[]
    avatar: string
    links?: string[]
    backgroundImg: string
}


export interface ProductData {
    id: string
    created_at: Date
    owner: string
    name: string
    description: string
    quantity: number
    price: number
    contactNum?: string
    contactEmail?: string
    org: string
}

export interface ProductDisplayProps {
    publishDate: Date
    owner: string
    name: string
    description: string
    quantity: number
    price: number
    contactNum?: string
    contactEmail?: string
    productImage: string
}


export interface PortfolioData {
    id: string
    created_at: Date
    name: string,
    location: string
    bio: string
    contactInfo: {
        phone: string
        email: string
        website?: string
        linkedin?: string
        github?: string
    }
    experience: string
    education: string
    skills: string[]
    projects: string
    languages: string[]
    certifications: string
    template: string
    org: string
}

export interface PortfolioTemplateProps {
    profileImage: string
    name: string
    location: string
    bio: string
    contactInfo: {
        phone: string
        email: string
        website?: string
        linkedin?: string
        github?: string
    }
    experience: string
    education: string
    skills: string[]
    projects: string
    languages: string[]
    certifications: string
}


export interface BusinessData {
    id: string
    created_at: Date
    name: string
    slogan: string
    cta: string
    description: string
    location: string
    phone: string
    email: string
    website?: string
    links?: {
        facebook?: string
        twitter?: string
        instagram?: string
        linkedin?: string
    }
    working_hours: string
    team?: {
        name: string
        role: string
        image: string
    }[]
    testimonials?: {
        name: string
        text: string
        rating: number
    }[]
    template: string
    products?: string[]
    org: string
}

export interface BusinessTemplateProps {
    logo?: string
    name: string
    slogan: string
    cta: string
    description: string
    image: string
    location: string
    phone: string
    email: string
    website?: string
    links?: {
        facebook?: string
        twitter?: string
        instagram?: string
        linkedin?: string
    }
    workingHours: string
    team?: {
        name: string
        role: string
        image: string
    }[]
    testimonials?: {
        name: string
        text: string
        rating: number
    }[]
    productsIdArr?: string[]
}


export interface AllProjectsDataType {
    label: string
    blog: BlogData[]
    product: ProductData[]
    portfolio: PortfolioData[]
    business: BusinessData[]
}[]
