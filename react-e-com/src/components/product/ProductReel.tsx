
// interface ProductReelProps {
//     title: string,
//     subtitle?:string,
//     href?:string
// }
interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
  }

export const products = [
    
  {
    "product_id" : "aaabbb123",
    "product_name": "product1",
    "product_price": 100.5,
    "product_detail": "High-tech smartwatch with fitness tracking, heart rate monitoring, and notifications. Water resistant up to 5 ATM.",
    "productUrlPicture": "product1"
  },
  {
    "product_id" : "aaabbb124",
    "product_name": "product2",
    "product_price": 70.94,
    "product_detail": "High-tech smartwatch with fitness tracking, heart rate monitoring, and notifications. Water resistant up to 5 ATM.",
    "productUrlPicture": "product2"
  },
  {
    "product_id" : "aaabbb125",
    "product_name": "product3",
    "product_price": 300.2,
    "product_detail": "High-tech smartwatch with fitness tracking, heart rate monitoring, and notifications. Water resistant up to 5 ATM.",
    "productUrlPicture": "product3"
  },
  {
    "product_id" : "aaabbb126",
    "product_name": "product4",
    "product_price": 120.5,
    "product_detail": "High-tech smartwatch with fitness tracking, heart rate monitoring, and notifications. Water resistant up to 5 ATM.",
    "productUrlPicture": "product4"
  },

]

import { Link } from "react-router-dom";
import ProductListing from "./ProductListing";

export default function ProductReel(props: ProductReelProps) {
  return (
    <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
            <div className="max-w-2xl px-4 lg:max-w-4x lg:px-0">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{props.title}</h1>
            </div>
            <Link to="/" className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block">Shop the Collection{' '} <span aria-hidden='true'>&rarr;</span> </Link>
                {/* <Link href={href}
                    className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
                >Shop the Collection{' '} <span aria-hidden='true'>&rarr;</span></Link> */}
        </div>
        <div className="relative">
            <div className="mt-6 flex items-center w-full">
                <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:grid-y-10">
                    {products.map((product, i)=>(
                        <ProductListing  
                        key={`product-${i}`}  
                        productDetails={product.product_detail}
                        productId={product.product_id}
                        productName={product.product_name}
                        productPrice={product.product_price}
                        productUrlPircture={product.productUrlPicture}/>
                    ))} 
                </div>
            </div>
        </div>
    </section>
  )
}
