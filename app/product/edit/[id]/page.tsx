import ProductFormForUpdating from "@/components/ClientSideForms/ProductFormForUpdating"

import { EditProduct } from "@/actions/ProductActions"
import { selectProduct } from "@/db/supabase-requests/ProductRequests"

import { selectImage } from "@/db/supabase-requests/ImageRequests"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default async function ProductEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Get the product data + product image
    const productData = await selectProduct(id)
    const imageUrl = await selectImage(id, "product-images")

    if (!productData) {
        return (
            <main className="w-full h-screen flex flex-col justify-center items-center gap-3">
                <div className="w-2/3">
                    <p className="text-red-700 text-xl text-center">Invalid URL</p>
                </div>
                <div className="w-1/3">
                    <p className="text-lg text-center">
                        {`${id} is not valid or product does't exist`}
                    </p>
                </div>
                <div className="w-1/3">
                    <ul className="text-green-700 flex flex-col gap-3 text-lg text-center">
                        <li>{`Make sure a product with ID: ${id} exists`}</li>
                        <li>Make sure the URL is valid and is of proper form</li>
                        <li>A server issue might have occured, try again later</li>
                    </ul>
                </div>
            </main>
        )
    }

    return (
        <main className="md:h-min-screen flex justify-center items-center mt-5">
            <Card className="w-[90%] mx-auto">
                <CardHeader>
                    <CardTitle>Update Product</CardTitle>
                    <CardDescription>
                        Update the fields you would like to be changed and
                        make sure your data meets the requirements
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductFormForUpdating
                        action={EditProduct}
                        id={id}
                        productData={productData}
                        imageUrl={imageUrl}
                    />
                </CardContent>
            </Card>
        </main>
    )
}