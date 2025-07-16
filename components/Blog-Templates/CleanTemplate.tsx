import Image from "next/image"
import parse from "html-react-parser"

import { format } from "date-fns"
import { Button } from "../ui/button"
import { Clock } from "lucide-react"

import { BlogTemplateProps } from "@/types/ProjectsDataType"
import { calcReadingDuration } from "@/utils/formattingHelpers"


export default function CleanTemplate({
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

    // word count divided by 200
    const readingDuration = calcReadingDuration(post)

    return (
        <article className="max-w-4xl mx-auto bg-slate-50">
            <div className="relative h-[40vh] md:h-[50vh]">
                <Image
                    src={backgroundImg || "/placeholder.clean.png"}
                    alt="Background Image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/30" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="inline-block px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-md mb-4">
                        {category.toUpperCase()}
                    </div>
                    <h1
                        style={{ fontFamily: fonts && fonts[0] ? fonts[0] : "" }}
                        className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                    >
                        {title}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-teal-400">
                            <Image
                                src={avatar || "/profile.svg"}
                                alt={writer}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium">{writer}</p>
                            <p className="text-sm opacity-80">Published on {format(new Date(publishDate), "MMMM d, yyyy")}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 bg-white -mt-6 relative rounded-t-3xl">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <Clock />
                            <span className="text-sm text-slate-500">{readingDuration} read</span>
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

                    <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50 -mx-8 -mb-12 p-8 rounded-b-3xl">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                                <Image
                                    src={avatar || "/profile.svg"}
                                    alt={writer}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* x2 Stupid code, database column should be changed first */}

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
            </div>
        </article>
    )
}
