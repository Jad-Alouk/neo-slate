import supabasePublic from "@/db/supabasePublic"
import { selectImage } from "@/db/supabase-requests/ImageRequests"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

import Image from "next/image"
import Link from "next/link"

/*
    This section is extracted from the business page templates because it has a lot of querying to do.
    It is inserted in each template and wrapped with <Suspense> tags to allow the user to start interacting
    with the page before everything is completly fetched.
*/

export default async function ProductsFromBiz({ productsIdArr }: { productsIdArr: string[] | undefined }) {

    // Initialize an array of objects with each object holding the info we need from the query.
    const products: { id: string, name: string, price: number, quantity: number, image: string }[] = []

    if (productsIdArr?.length) {

        // Loop over each product id and fetch the data we need from the product table.
        for (let i = 0; i < productsIdArr.length; i++) {

            // Public query.
            const { data, error } = await supabasePublic
                .from("product")
                .select("name, price, quantity")
                .eq("id", productsIdArr[i])


            // Terminate if no data found to save some time.
            if (error || !data || data.length === 0) {
                continue
            }

            // fetch the product image
            const productImage = await selectImage(productsIdArr[i], "product-images")

            // Group each product's info in one object. 
            // Push that object to the products array initialized in the beginning.
            products.push({
                id: productsIdArr[i],
                name: data[0].name,
                price: data[0].price,
                quantity: data[0].quantity,
                image: productImage
            })

            // When the loop finishes, the products array is populated and we can map over it to create the UI. 
        }
    }

    return (
        <>
            {products && products.length > 0 && (
                <section id="products" className="py-16 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">Our Products & Services</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {products.map((product, index) => (
                                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square overflow-hidden">
                                        <Image
                                            src={product.image || "/window.svg"}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-2xl font-bold text-primary">${product.price.toFixed(3)}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {product.quantity > 0 ? `${product.quantity} available` : "Out of stock"}
                                            </span>
                                        </div>
                                        <Link href={`/product/${product.id}`}>
                                            <Button className="w-full mt-4">
                                                Learn More
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}