import ProductForm from "@/components/ClientSideForms/ProductForm"

import { CreateProduct } from "@/actions/ProductActions"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function product() {
    return (
        <main className="md:h-min-screen flex justify-center items-center mt-5">
            <Card className="w-[90%] mx-auto">
                <CardHeader>
                    <CardTitle>New Product</CardTitle>
                    <CardDescription>
                        Fill the required fields below to deploy a new
                        product
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm action={CreateProduct} />
                </CardContent>
            </Card>
        </main>
    )
}