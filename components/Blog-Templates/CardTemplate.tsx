import Image from "next/image"
import parse from "html-react-parser"

import { format } from "date-fns"

import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Clock } from "lucide-react"

import { BlogTemplateProps } from "@/types/ProjectsDataType"
import { calcReadingDuration } from "@/utils/formattingHelpers"


export default function CardTemplate({
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
        <article className="max-w-4xl mx-auto bg-zinc-950 text-zinc-100 rounded-xl overflow-hidden">
            <div className="relative h-[40vh]">
                <Image
                    src={backgroundImg || "/placeholder.card.jpg"}
                    alt="Background Image"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-zinc-950/30" />
            </div>

            <div className="px-6 py-8 md:px-12 md:py-10 -mt-20 relative z-10">
                <div className="inline-block px-3 py-1 bg-emerald-500 text-black text-sm font-medium rounded-full mb-6">
                    {category.toUpperCase()}
                </div>

                <h1
                    style={{ fontFamily: fonts && fonts[0] ? fonts[0] : "" }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                >
                    {title}
                </h1>

                <div className="flex items-center gap-4 mb-10">
                    <Avatar>
                        <AvatarImage
                            src={avatar}
                            alt={writer}
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <AvatarFallback>{writer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-white">{writer}</p>
                        <p className="text-sm text-zinc-400">{format(new Date(publishDate), "MMMM d, yyyy")}</p>
                    </div>

                    <div className="ml-10 flex items-center gap-2">
                        <Clock />
                        <span className="text-sm text-slate-500">{readingDuration} read</span>
                    </div>
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

                <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage
                                src={avatar}
                                alt={writer}
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                            <AvatarFallback>{writer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-white">{writer}</p>
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
        </article>
    )
}