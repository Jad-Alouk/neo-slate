import Image from "next/image"
import { formatDistance } from "date-fns"

import { Phone, Mail, DollarSign, Calendar, User } from "lucide-react"

import ShareButtonClient from "./ShareButtonClient"
import { ProductDisplayProps } from "@/types/ProjectsDataType"


export default function ProductDisplay({
    publishDate,
    owner,
    name,
    description,
    quantity,
    price,
    contactNum,
    contactEmail,
    productImage
}: ProductDisplayProps) {

    const publishedTimeAgo = formatDistance(publishDate, new Date(), { addSuffix: true })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-[300px] sm:h-[400px] md:h-full min-h-[400px] bg-gray-100">
                        <Image
                            src={productImage}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    <div className="p-6 md:p-8 lg:p-10 flex flex-col">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
                                </span>
                                <span className="text-gray-500 text-sm flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {publishedTimeAgo}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{name}</h1>

                            <div className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                                <DollarSign className="h-5 w-5 text-gray-500" />
                                {price.toFixed(3)}
                            </div>

                            <div className="prose prose-sm text-gray-600 mb-8">
                                <p>{description}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-900">Seller: {owner}</span>
                                </div>

                                {(contactEmail || contactNum) && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-gray-900">Contact Information:</h3>
                                        <div className="flex flex-col gap-2">
                                            {contactEmail && (
                                                <a
                                                    href={`mailto:${contactEmail}`}
                                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition-colors"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                    {contactEmail}
                                                </a>
                                            )}
                                            {contactNum && (
                                                <a
                                                    href={`tel:${contactNum}`}
                                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition-colors"
                                                >
                                                    <Phone className="h-4 w-4" />
                                                    {contactNum}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <ShareButtonClient />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
