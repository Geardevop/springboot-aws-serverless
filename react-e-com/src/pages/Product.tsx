import AddToCartButton from "@/components/AddToCartButton"
import { Link } from "react-router-dom"
import { Check, Shield } from "lucide-react"
import { products } from "@/components/product/ProductReel"
import { useParams } from "react-router-dom"
import { formatPrice } from "@/lib/utils"
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import  type { Product } from "@/lib/Basket.type"
const BREADCRUMBS = [
    {id: 1, name: "HOME", href: "/"},
    {id:2, name:"PRODUCT", href: "/products"}
]
const Product =  () =>{
    const params = useParams()
    const productId = params.id
    const filteredProduct  = products.find(product => product.product_id === productId);
    return (
    <div className="bg-white mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="bg-white ">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product Details */}
                <div className="lg:max-w-lg lg-self-end">
                    <ol className="flex items-center space-x-2">
                        {BREADCRUMBS.map((breadcrumb,index) =>(
                            <li key={breadcrumb.href}>
                                <div className="flex items-center text-sm">
                                    <Link
                                    to={breadcrumb.href}
                                    className="font-medium text-sm text-muted-foreground text-gray-900">
                                        {breadcrumb.name}
                                    </Link>
                                    {index !== BREADCRUMBS.length -1 ? (
                                        <svg
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                        aria-hidden='true'
                                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                    </svg>
                                    ): null}
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {filteredProduct?.product_name}
                        </h1>
                    </div>
                    <section className="mt-4">
                        <div className="flex items-center">
                            <p className="font-medium text-gray-900">
                               {formatPrice(filteredProduct?.product_price as number)}
                            </p>
                            <div className="ml-4 border-1 text-muted-foreground border-gray-300 pl-4">
                                label
                            </div>
                        </div>
                        <div className="mt-4 space-y-6">
                            <p className="text-base text-muted-foreground">{filteredProduct?.product_detail}</p>
                        </div>
                        <div className="mt-6 flex items-center">
                            <Check aria-hidden='true' className="h-5 w-5 flex-shrink-0 text-green-500"/>
                            <p className="ml-2 text-sm text-muted-foreground">Eligible for instant delivery</p>
                        </div>
                    </section>
                </div>
                {/* Product Image */}
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-square rounded-lg">
                        <img 
                            loading='eager' 
                            className='-z-10 h-full w-full object-cover object-center'
                            src={filteredProduct?.productUrlPicture == 'product1' ? product1 : filteredProduct?.productUrlPicture =='product2' ? product2 : filteredProduct?.productUrlPicture == 'product3' ? product3 : filteredProduct?.productUrlPicture == 'product4'? product4 : undefined }
                            alt="Product IMage"
                            />
                    </div>
                </div>
                {/* add to cart section */}
                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <div>
                        <div className="mt-10">
                        <AddToCartButton 
                        product_id={filteredProduct?.product_id as string} 
                        product_detail={filteredProduct?.product_detail as string} 
                        product_name={filteredProduct?.product_name as string} 
                        product_price={filteredProduct?.product_price as number}
                        />
                        </div>
                        <div className="mt-6 text-center">
                            <div className="group inline-flex text-sm text-medium">
                                <Shield
                                aria-hidden='true'
                                className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                                />
                                <span className="text-muted-foreground hover:text-gray-700">30 Day Return Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )

}

export default Product