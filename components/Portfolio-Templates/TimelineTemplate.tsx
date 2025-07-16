import parse from "html-react-parser"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Globe, Linkedin, Github } from "lucide-react"

import { PortfolioTemplateProps } from "@/types/ProjectsDataType"

/*
    Several fields in the portfolio are stored as strings of HTML elements.
    An HTML parser is used (parse) to convert the stored strings into HTML
    tags.
*/

export default function PortfolioTimeline({
    profileImage,
    name,
    location,
    bio,
    contactInfo,
    experience,
    education,
    skills,
    projects,
    languages,
    certifications
}: PortfolioTemplateProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b bg-white py-8">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-full">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    width={300}
                                    height={300}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{name}</h1>
                                <div className="flex items-center text-gray-500">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {location}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={`tel:${contactInfo.phone}`}
                                className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
                            >
                                <Phone className="h-4 w-4" />
                                <span>{contactInfo.phone}</span>
                            </a>
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
                            >
                                <Mail className="h-4 w-4" />
                                <span>{contactInfo.email}</span>
                            </a>
                            {contactInfo.website && (
                                <a
                                    href={contactInfo.website}
                                    className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
                                >
                                    <Globe className="h-4 w-4" />
                                    <span>Website</span>
                                </a>
                            )}
                            {contactInfo.linkedin && (
                                <a
                                    href={contactInfo.linkedin}
                                    className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                            {contactInfo.github && (
                                <a
                                    href={contactInfo.github}
                                    className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
                                >
                                    <Github className="h-4 w-4" />
                                    <span>GitHub</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-8 lg:col-span-2">
                        <section>
                            <h2 className="mb-6 text-2xl font-bold">About Me</h2>
                            <p className="text-gray-700">{bio}</p>
                        </section>

                        <section>
                            <h2 className="mb-6 text-2xl font-bold">Experience</h2>
                            <div className="relative border-l border-gray-200 pl-6">
                                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-gray-200"></div>
                                <div className="w-max-none flex flex-col justify-center items-center gap-1">
                                    {
                                        parse(experience, {
                                            transform(reactNode, _domNode, index) {
                                                return (
                                                    <span
                                                        key={index}
                                                    >
                                                        {reactNode}
                                                    </span>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className="absolute -left-1.5 bottom-0 h-3 w-3 rounded-full bg-gray-200"></div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-6 text-2xl font-bold">Education</h2>
                            <div className="relative border-l border-gray-200 pl-6">
                                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-gray-200"></div>
                                <div className="w-max-none flex flex-col justify-center items-center gap-1">
                                    {
                                        parse(education, {
                                            transform(reactNode, _domNode, index) {
                                                return (
                                                    <span
                                                        key={index}
                                                    >
                                                        {reactNode}
                                                    </span>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className="absolute -left-1.5 bottom-0 h-3 w-3 rounded-full bg-gray-200"></div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-6 text-2xl font-bold">Projects</h2>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="w-max-none flex flex-col justify-center items-center gap-1">
                                        {
                                            parse(projects, {
                                                transform(reactNode, _domNode, index) {
                                                    return (
                                                        <span
                                                            key={index}
                                                        >
                                                            {reactNode}
                                                        </span>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="mb-4 text-xl font-bold">Skills</h2>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, index) => (
                                            <Badge key={index} className="bg-gray-100 text-gray-800">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold">Languages</h2>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((language, index) => (
                                            <Badge key={index} variant="outline">
                                                {language}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-bold">Certifications</h2>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="w-max-none flex flex-col justify-center items-center gap-1">
                                        {
                                            parse(certifications, {
                                                transform(reactNode, _domNode, index) {
                                                    return (
                                                        <span
                                                            key={index}
                                                        >
                                                            {reactNode}
                                                        </span>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
