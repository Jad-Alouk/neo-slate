import Image from "next/image"
import parse from "html-react-parser"

import { format } from "date-fns"
import { Button } from "../ui/button"

import { BlogTemplateProps } from "@/types/ProjectsDataType"


export default function SocialTemplate({
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
        <article className="max-w-4xl mx-auto bg-white">
            <header className="border-b border-gray-200 pb-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="bg-red-600 text-white px-3 py-1 text-sm font-bold">
                        {category.toLocaleUpperCase()}
                    </div>
                    <p className="text-gray-500 text-sm">{format(new Date(publishDate), "EEEE, MMMM d, yyyy")}</p>
                </div>

                <h1
                    style={{ fontFamily: fonts && fonts[0] ? fonts[0] : "" }}
                    className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                >
                    {title}
                </h1>

                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                            src={avatar || "/profile.svg"}
                            alt={writer}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-medium">By {writer}</p>
                    </div>
                </div>
            </header>

            <div className="relative h-[50vh] mb-8 overflow-hidden">
                <Image
                    src={backgroundImg || "/placeholder.social.png"}
                    alt="Background Image"
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                </div>
            </div>

            <div className="px-4 md:px-0">
                <div className="float-left mr-6 mb-4 w-1/3">
                    <blockquote className="border-l-4 border-red-600 pl-4 italic text-xl text-gray-700 py-2">
                        Artcile written by {writer} on {format(new Date(publishDate), "EEEE, MMMM d, yyyy")}
                    </blockquote>
                </div>

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
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
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
