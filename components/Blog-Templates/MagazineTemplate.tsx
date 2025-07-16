import Image from "next/image"
import parse from "html-react-parser"

import { Button } from "../ui/button"

import { format } from "date-fns"
import { BlogTemplateProps } from "@/types/ProjectsDataType"


export default function MagazineTemplate({
    publishDate,
    title,
    writer,
    post,
    fonts,
    avatar,
    links,
    backgroundImg
}: BlogTemplateProps) {
    return (
        <article className="max-w-4xl mx-auto">
            <div className="relative h-[50vh] mb-8 overflow-hidden rounded-xl">
                <Image
                    src={backgroundImg || "/placeholder.magazine.jpg"}
                    alt="Background Image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h1
                        style={{ fontFamily: fonts && fonts[0] ? fonts[0] : "" }}
                        className="text-5xl font-bold mb-4 leading-tigh"
                    >
                        {title}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-300">
                            <Image
                                src={avatar || "/profile.svg"}
                                alt={writer}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium">{writer}</p>
                            <p className="text-sm opacity-80">{format(new Date(publishDate), "MMMM d, yyyy")}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-0">
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

                <div className="mt-12 pt-8 border-t border-purple-200">
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
                            <p className="text-lg font-medium">Written by {writer}</p>
                            <p className="text-sm text-muted-foreground">
                                Published on {format(new Date(publishDate), "MMMM d, yyyy")}
                            </p>
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
