import Image from "next/image"
import parse from "html-react-parser"

import { format } from "date-fns"

import { BlogTemplateProps } from "@/types/ProjectsDataType"
import { Button } from "../ui/button"


export default function EnergeticTemplate({
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
        <article className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-t-xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="bg-white text-red-600 px-3 py-1 text-sm font-bold rounded-full">
                        {category.toUpperCase()}
                    </div>
                    <p className="text-white/80 text-sm">{format(new Date(publishDate), "MMM d, yyyy")}</p>
                </div>

                <h1
                    style={{ fontFamily: fonts && fonts[0] ? fonts[0] : "" }}
                    className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
                >
                    {title}
                </h1>

                <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                        <Image
                            src={avatar || "/profile.svg"}
                            alt={writer}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-medium text-lg">{writer}</p>
                    </div>
                </div>
            </div>

            <div className="relative h-[50vh]">
                <Image
                    src={backgroundImg || "/placeholder.energetic.webp"}
                    alt="Background Image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="bg-white p-8 shadow-lg rounded-b-xl">
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500">
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
