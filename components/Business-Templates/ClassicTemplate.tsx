import ProductsFromBiz from "../ProductsFromBiz"

import Image from "next/image"
import Link from "next/link"

import { BusinessTemplateProps } from "@/types/ProjectsDataType"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Clock, Star, MapPin } from "lucide-react"


export default async function ClassicTemplate({
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
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {logo && (
                            <Image
                                src={logo || "/globe.svg"}
                                alt={`${name} logo`}
                                width={40}
                                height={40}
                                className="rounded"
                            />
                        )}
                        <h1 className="text-2xl font-bold">{name}</h1>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="#about" className="hover:text-primary">
                            About
                        </Link>
                        {productsIdArr && productsIdArr.length > 0 && (
                            <Link href="#products" className="hover:text-primary">
                                Products
                            </Link>
                        )}
                        <Link href="#team" className="hover:text-primary">
                            Team
                        </Link>
                        {testimonials && testimonials.length > 0 && (
                            <Link href="#testimonials" className="hover:text-primary">
                                Testimonials
                            </Link>
                        )}
                        <Link href="#contact" className="hover:text-primary">
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">{slogan}</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
                    <Button size="lg" className="md:text-lg px-2 md:px-8 py-3">
                        {cta}
                    </Button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">About Our Business</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span>{workingHours}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <span>{phone}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span>{email}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                    <span>{location}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Image
                                src={image || "/window.svg"}
                                alt="Business location"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <Suspense fallback="Loading...">
                <ProductsFromBiz productsIdArr={productsIdArr} />
            </Suspense>

            {/* Team Section */}
            {team && team.length > 0 && (
                <section id="team" className="py-16 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">Our Team</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <Card key={index} className="text-center">
                                    <CardContent className="p-6">
                                        <Image
                                            src={member.image || "/window.svg"}
                                            alt={member.name}
                                            width={200}
                                            height={200}
                                            className="rounded-full mx-auto mb-4"
                                        />
                                        <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                                        <p className="text-muted-foreground">{member.role}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {testimonials && testimonials.length > 0 && (
                <section id="testimonials" className="py-16">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground mb-4">
                                            {`"${testimonial.text}"`}
                                        </p>
                                        <p className="font-semibold">- {testimonial.name}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-8">Ready to Get Started?</h3>
                    <p className="text-xl mb-8 opacity-90">Contact us today to learn more about our services</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Button variant="secondary" size="lg">
                            {cta}
                        </Button>
                        {website && (
                            <Link href={`https://${website}`} className="text-primary-foreground hover:underline">
                                Visit our website: {website}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-muted-foreground">© 2024 {name}. All rights reserved.</p>
                    {links && (
                        <div className="flex justify-center space-x-4 mt-4">
                            {links.facebook && (
                                <Link href={links.facebook} className="text-muted-foreground hover:text-primary">
                                    Facebook
                                </Link>
                            )}
                            {links.twitter && (
                                <Link href={links.twitter} className="text-muted-foreground hover:text-primary">
                                    Twitter
                                </Link>
                            )}
                            {links.instagram && (
                                <Link href={links.instagram} className="text-muted-foreground hover:text-primary">
                                    Instagram
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </footer>
        </div>
    )
}