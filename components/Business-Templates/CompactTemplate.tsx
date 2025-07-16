import ProductsFromBiz from "../ProductsFromBiz"
import { BusinessTemplateProps } from "@/types/ProjectsDataType"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Clock, Star, ExternalLink, Users, Award, MapPin } from "lucide-react"

import { Suspense } from "react"


export default function CompactTemplate({
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
            <div className="lg:grid lg:grid-cols-12 lg:min-h-screen">
                {/* Sidebar */}
                <div className="lg:col-span-4 xl:col-span-3 bg-muted/30 p-8 lg:p-12">
                    <div className="sticky top-8 space-y-8">
                        {/* Logo and Business Name */}
                        <div className="space-y-4">
                            {logo && (
                                <Image
                                    src={logo || "/placeholder.svg"}
                                    alt={`${name} logo`}
                                    width={60}
                                    height={60}
                                    className="rounded-lg"
                                />
                            )}
                            <h1 className="text-2xl lg:text-3xl font-bold leading-tight">{name}</h1>
                            <p className="text-lg text-muted-foreground">{slogan}</p>
                        </div>

                        <Separator />

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-muted-foreground">{phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-muted-foreground">{email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Hours</p>
                                        <p className="text-muted-foreground">{workingHours}</p>
                                    </div>
                                </div>

                                {website && (
                                    <div className="flex items-start space-x-3">
                                        <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium">Website</p>
                                            <Link href={`https://${website}`} className="text-primary hover:underline">
                                                {website}
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-muted-foreground">{location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Social Media */}
                        {links && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Follow Us</h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(links).map(([platform, url]) => (
                                        <Button key={platform} variant="outline" size="sm" asChild>
                                            <Link href={url} className="capitalize">
                                                {platform}
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button className="w-full" size="lg">
                            {cta}
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8 xl:col-span-9">
                    {/* Hero Section */}
                    <section className="relative h-96 lg:h-[500px] overflow-hidden">
                        <Image src={image || "/placeholder.svg"} alt="Business location" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl lg:text-6xl font-bold mb-6">{slogan}</h2>
                                <p className="text-xl lg:text-2xl opacity-90">{description}</p>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="p-8 lg:p-12">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8">About Our Company</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    {description} Our commitment to excellence and innovation has made us a trusted partner for businesses
                                    looking to achieve sustainable growth and competitive advantage.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 my-12">
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                                            <p className="text-muted-foreground">Committed to delivering the highest quality results</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                                            <p className="text-muted-foreground">Working together to achieve your business goals</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                                            <p className="text-muted-foreground">Cutting-edge solutions for modern challenges</p>
                                        </CardContent>
                                    </Card>
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
                        <section className="p-8 lg:p-12 bg-muted/30">
                            <div className="max-w-4xl">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our Expert Team</h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {team.map((member, index) => (
                                        <div key={index} className="text-center">
                                            <Image
                                                src={member.image || "/placeholder.svg"}
                                                alt={member.name}
                                                width={120}
                                                height={120}
                                                className="rounded-full mx-auto mb-4"
                                            />
                                            <h3 className="font-semibold mb-1">{member.name}</h3>
                                            <p className="text-sm text-muted-foreground">{member.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Testimonials Section */}
                    {testimonials && testimonials.length > 0 && (
                        <section className="p-8 lg:p-12">
                            <div className="max-w-4xl">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8">Client Testimonials</h2>
                                <div className="space-y-6">
                                    {testimonials.map((testimonial, index) => (
                                        <Card key={index} className="border-l-4 border-l-primary">
                                            <CardContent className="p-6">
                                                <div className="flex mb-3">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                                <blockquote className="text-lg mb-4 italic">
                                                    {`"${testimonial.text}"`}
                                                </blockquote>
                                                <cite className="font-semibold not-italic text-primary">— {testimonial.name}</cite>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CTA Section */}
                    <section className="p-8 lg:p-12 bg-primary text-primary-foreground">
                        <div className="max-w-4xl text-center">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Take Your Business to the Next Level?</h2>
                            <p className="text-xl mb-8 opacity-90">
                                {`Let's discuss how we can help you achieve your business objectives and drive sustainable growth.`}
                            </p>
                            <Button size="lg" variant="secondary" className="text-lg px-8">
                                {cta}
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}