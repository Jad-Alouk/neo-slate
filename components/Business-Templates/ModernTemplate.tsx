import ProductsFromBiz from "../ProductsFromBiz"
import { BusinessTemplateProps } from "@/types/ProjectsDataType"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Clock, Star, ArrowRight, MapPin } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

import { Suspense } from "react"


export default function ModernTemplate({
    logo,
    name,
    slogan,
    cta,
    description,
    image,
    location,
    phone,
    email,
    website,
    links,
    workingHours,
    team,
    testimonials,
    productsIdArr
}: BusinessTemplateProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {logo && (
                                <Image
                                    src={logo || "/placeholder.svg"}
                                    alt={`${name} logo`}
                                    width={32}
                                    height={32}
                                    className="rounded"
                                />
                            )}
                            <span className="text-xl font-bold">{name}</span>
                        </div>
                        <Button>{cta}</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <Badge variant="secondary" className="w-fit">
                                {name}
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">{slogan}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="text-lg">
                                    {cta}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="lg" className="text-lg">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={image || "/placeholder.svg"}
                                alt="Business showcase"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <Clock className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Working Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{workingHours}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <Phone className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Contact Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-2">{phone}</p>
                                <p className="text-muted-foreground mb-2">{email}</p>
                                <div className="flex items-start space-x-2 mt-3">
                                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{location}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {website && (
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Visit Online</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Link href={`https://${website}`} className="text-primary hover:underline">
                                        {website}
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <Suspense fallback="Loading...">
                <ProductsFromBiz productsIdArr={productsIdArr} />
            </Suspense>

            {/* Team Section */}
            {team && team.length > 0 && (
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
                            <p className="text-xl text-muted-foreground">The people behind our success</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <Card
                                    key={index}
                                    className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <Image
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                        <p className="text-muted-foreground">{member.role}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {testimonials && testimonials.length > 0 && (
                <section className="py-16 px-4 bg-muted/30">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
                            <p className="text-xl text-muted-foreground">What our clients say about us</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="border-0 shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <blockquote className="text-lg mb-4 italic">
                                            {`"${testimonial.text}"`}
                                        </blockquote>
                                        <cite className="font-semibold not-italic">— {testimonial.name}</cite>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-4 bg-primary text-primary-foreground">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join hundreds of satisfied clients who have chosen us for their business needs.
                    </p>
                    <Button size="lg" variant="secondary" className="text-lg px-8">
                        {cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-background border-t">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-muted-foreground">© 2024 {name}. All rights reserved.</p>
                        </div>
                        {links && (
                            <div className="flex space-x-6">
                                {Object.entries(links).map(([platform, url]) => (
                                    <Link
                                        key={platform}
                                        href={url}
                                        className="text-muted-foreground hover:text-primary capitalize transition-colors"
                                    >
                                        {platform}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    )
}