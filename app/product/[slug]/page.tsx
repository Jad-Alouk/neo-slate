import { selectProduct } from "@/db/supabase-requests/ProductRequests"
import { selectImage } from "@/db/supabase-requests/ImageRequests"

import ProductDisplay from "@/components/ProductDisplay"


export default async function LiveProduct({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Get the product data + product image
    const productData = await selectProduct(slug)
    const image = await selectImage(productData.id, "product-images")

    return (
        <ProductDisplay
            publishDate={productData.created_at}
            owner={productData.owner}
            name={productData.name}
            description={productData.description}
            quantity={productData.quantity}
            price={productData.price}
            contactNum={productData.contactNum}
            contactEmail={productData.contactEmail}
            productImage={image}
        />
    )
}