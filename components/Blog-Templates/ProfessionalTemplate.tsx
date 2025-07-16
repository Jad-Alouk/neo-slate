import Image from "next/image"
import parse from "html-react-parser"

import { format } from "date-fns"
import { Button } from "../ui/button"

import { BlogTemplateProps } from "@/types/ProjectsDataType"


export default function ProfessionalTemplate({
    publishDate,
    title,
    writer,
    post,
    category,
    fonts,
    avatar,
    links,
    backgroundImg
}: BlogTemplateProps) {
    return (
        <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            {category.toUpperCase()}
                        </span>
                    </div>

                    <h1
                        style={{ fontFamily: fonts && fonts[0] ? fonts[0] : "" }}
                        className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight"
                    >
                        {title}
                    </h1>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={avatar || "/profile.svg"}
                                alt={writer}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{writer}</p>
                            <p className="text-xs text-gray-500">{format(new Date(publishDate), "MMM d, yyyy")}</p>
                        </div>
                    </div>
                </div>

                <div className="relative h-64 md:h-auto">
                    <Image
                        src={backgroundImg || "/placeholder.professional.webp"}
                        alt="Background Image"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="p-8 md:p-12">
                <div className="flex flex-col justify-center items-center gap-1">
                    {/* Post text is stored as a string of HTML elements so an HTML parser is used */}
                    {
                        parse(post, {
                            transform(reactNode, _domNode, index) {
                                return (
                                    <span
                                        key={index}
                                        style={{ fontFamily: fonts && fonts[1] ? fonts[1] : "" }}
                                    >
                                        {reactNode}
                                    </span>
                                )
                            }
                        })
                    }
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                                <Image
                                    src={avatar || "/profile.svg"}
                                    alt={writer}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-lg font-medium">{writer}</p>
                            </div>
                        </div>

                        {/* Stupid code, database column should be changed first */}

                        {
                            links && links.length > 0
                                ? <div
                                    className="ml-5 md:ml-0 flex flex-wrap justify-center items-center gap-2"
                                >
                                    {
                                        links.map((link, index) => {
                                            if (link.slice(0, 8) == "https://") {
                                                return (
                                                    <Button
                                                        key={index}
                                                        className="rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                                    >
                                                        {
                                                            <a
                                                                className="p-2"
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {
                                                                    index == 0
                                                                        ? "Instagram"
                                                                        : index == 1
                                                                            ? "Twitter"
                                                                            : index == 2
                                                                                ? "LinkedIn"
                                                                                : null
                                                                }
                                                            </a>
                                                        }
                                                    </Button>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </article>
    )
}
