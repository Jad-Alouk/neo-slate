import parse from "html-react-parser"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building, GraduationCap, Mail, MapPin, Phone, Globe, Linkedin, Github } from "lucide-react"

import { PortfolioTemplateProps } from "@/types/ProjectsDataType"

/*
    Several fields in the portfolio are stored as strings of HTML elements.
    An HTML parser is used (parse) to convert the stored strings into HTML
    tags.
*/

export default function PortfolioMinimal({
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
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="relative h-40 w-40 overflow-hidden rounded-full">
                                <Image
                                    src={profileImage}
                                    alt={name}
                                    width={300}
                                    height={300}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h1 className="mt-4 text-2xl font-bold">{name}</h1>
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="mr-1 h-4 w-4" />
                                {location}
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                            <h2 className="text-lg font-semibold">Contact</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>{contactInfo.phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>{contactInfo.email}</span>
                                </div>
                                {contactInfo.website && (
                                    <div className="flex items-center">
                                        <Globe className="mr-2 h-4 w-4 text-gray-500" />
                                        <a href={contactInfo.website} className="text-blue-600 hover:underline">
                                            Website
                                        </a>
                                    </div>
                                )}
                                {contactInfo.linkedin && (
                                    <div className="flex items-center">
                                        <Linkedin className="mr-2 h-4 w-4 text-gray-500" />
                                        <a href={contactInfo.linkedin} className="text-blue-600 hover:underline">
                                            LinkedIn
                                        </a>
                                    </div>
                                )}
                                {contactInfo.github && (
                                    <div className="flex items-center">
                                        <Github className="mr-2 h-4 w-4 text-gray-500" />
                                        <a href={contactInfo.github} className="text-blue-600 hover:underline">
                                            GitHub
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                            <h2 className="text-lg font-semibold">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="bg-white">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                            <h2 className="text-lg font-semibold">Languages</h2>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((language, index) => (
                                    <Badge key={index} variant="outline" className="bg-white">
                                        {language}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 md:col-span-2">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold">About Me</h2>
                            <p className="text-gray-700">{bio}</p>
                        </section>

                        <Separator />

                        <section>
                            <div className="mb-4 flex items-center">
                                <Building className="mr-2 h-5 w-5 text-gray-700" />
                                <h2 className="text-2xl font-bold">Experience</h2>
                            </div>
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
                        </section>

                        <Separator />

                        <section>
                            <div className="mb-4 flex items-center">
                                <GraduationCap className="mr-2 h-5 w-5 text-gray-700" />
                                <h2 className="text-2xl font-bold">Education</h2>
                            </div>
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
                        </section>

                        <Separator />

                        <section>
                            <h2 className="mb-4 text-2xl font-bold">Projects</h2>
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
                        </section>

                        <Separator />

                        <section>
                            <h2 className="mb-4 text-2xl font-bold">Certifications</h2>
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
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
