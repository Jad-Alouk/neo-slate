import parse from "html-react-parser"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Building,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Globe,
    Linkedin,
    Github,
    User,
    Code,
    Award,
    Languages
} from "lucide-react"

import { PortfolioTemplateProps } from "@/types/ProjectsDataType"

/*
    Several fields in the portfolio are stored as strings of HTML elements.
    An HTML parser is used (parse) to convert the stored strings into HTML
    tags.
*/

export default function PortfolioModern({
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 text-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                        <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
                            <Image
                                src={profileImage}
                                alt={name}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold">{name}</h1>
                            <div className="mt-2 flex items-center justify-center text-gray-300 md:justify-start">
                                <MapPin className="mr-1 h-4 w-4" />
                                {location}
                            </div>
                            <p className="mt-4 max-w-xl text-gray-300">{bio}</p>
                            <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                >
                                    <Phone className="h-4 w-4" />
                                    {contactInfo.phone}
                                </a>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                >
                                    <Mail className="h-4 w-4" />
                                    {contactInfo.email}
                                </a>
                                {contactInfo.website && (
                                    <a
                                        href={contactInfo.website}
                                        className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Website
                                    </a>
                                )}
                                {contactInfo.linkedin && (
                                    <a
                                        href={contactInfo.linkedin}
                                        className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                        LinkedIn
                                    </a>
                                )}
                                {contactInfo.github && (
                                    <a
                                        href={contactInfo.github}
                                        className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                    >
                                        <Github className="h-4 w-4" />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <Tabs defaultValue="experience" className="w-full">
                    <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 md:grid-cols-5">
                        <TabsTrigger value="experience" className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span className="hidden md:inline">Experience</span>
                        </TabsTrigger>
                        <TabsTrigger value="education" className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            <span className="hidden md:inline">Education</span>
                        </TabsTrigger>
                        <TabsTrigger value="skills" className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            <span className="hidden md:inline">Skills</span>
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden md:inline">Projects</span>
                        </TabsTrigger>
                        <TabsTrigger value="certifications" className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <span className="hidden md:inline">Certifications</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="experience">
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-bold">Professional Experience</h2>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="education">
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-bold">Education</h2>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="skills">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <h2 className="text-2xl font-bold">Technical Skills</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, index) => (
                                            <Badge key={index} className="bg-gray-100 text-gray-800">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Languages className="h-5 w-5" />
                                        <h2 className="text-2xl font-bold">Languages</h2>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((language, index) => (
                                            <Badge key={index} variant="outline" className="bg-white">
                                                {language}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects">
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-bold">Projects</h2>
                            </CardHeader>
                            <CardContent>
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
                    </TabsContent>

                    <TabsContent value="certifications">
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-bold">Certifications</h2>
                            </CardHeader>
                            <CardContent>
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
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
