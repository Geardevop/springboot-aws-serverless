"use client"
import { Button } from "@/components/ui/button"

import { cn, formatPrice } from "@/lib/utils"
import { Check, Loader2, X } from "lucide-react"
import hippoPic from '../assets/hippo-email-sent.png';
import { useState } from "react"
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import { Link } from "react-router-dom";
const Cart = () =>{



    // const {mutate: createCheckoutSessions, isLoading} = trpc.payment.createSessions.useMutation({
    //     onSuccess : ({url}) =>{
    //         if(url) router.push(url)
    //     }
    // })
    interface products {
        "image" : string,
        "id" : string,
        "name" : string
        "price": string,
        "url" : string
    }
    const items:products[] = []
    // const productIds = [
    //     {

    //     },
    //     {

    //     }
    // ]

    const [isMouted] = useState<boolean>(false)
    // const cartTotal = items.reduce(
    //     (total, {product})=> total+product.price, 0)
    // useEffect(()=>{
    //     setIsMouted(true)
    // },[])
    const fee =1
    return(
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shoping Cart
                </h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <div className={cn("lg:col-span-7", {
                        "rounded-lg border-2 border-dashed border-zinc-200 p-12":  items.length === 0,
                    })}>
                        <h2 className="sr-only">
                            Items in your shopping cart
                        </h2>
                        {items.length == 0 ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-1">
                                <div aria-hidden='true' className="relative mt-4 h-40 w-40 text-muted-foreground">
                                    <img src={hippoPic} loading="eager" alt="empty shoppung cart hippo"/>
                                </div>
                                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                                <p className="text-muted-foreground text-center">
                                    Whoop! Noting to show here yet
                                </p>
                            </div>
                        ): null}
                        <ul className={cn({
                            "divide-y divide-gray-200 border-b boder-t border-gray-200":  items.length >0
                        })}>
                            {items.length == 0 && items.map((product)=>{
                                // const label = PRODUCT_CATEGORY.find((c)=> c.value === product.category)?.label
                                const image = product.image
                                return (
                                    <li key={product.id} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            <div className="relative h-24 w-24">
                                                <img 
                                                    src={image == 'product1' ? product1 : image =='product2' ? product2 : image == 'product3' ? product3 : image == 'product4'? product4 :undefined} 
                                                    alt="product-image" 
                                                    className="h-full w-full rounded-md object-cover object-center sm:h48 sm:w-48"/>
                                                
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <Link to={`/product/${product.id}`}
                                                            className="font-medium text-gray-700 hover:text-gray-800"
                                                            >
                                                                {product.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-muted-foreground">
                                                            Categry :
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                                        {formatPrice(product.price)}
                                                    </p>
                                                </div>
                                                <div className="mt-4 sm:mt-0 sm:pr-9 w-29">
                                                    <div className="absolute right-0 top-0">
                                                        <Button
                                                         aria-label='remove product'
                                                        //  onClick={()=>{
                                                        //     removeItem(product.id)
                                                        //  }}
                                                         variant='ghost'
                                                        >
                                                            <X className="h-5 w-4"
                                                               aria-hidden='true'
                                                            />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                <Check className="h-5 w-5 flex-shrink-0 text-green-500"/>
                                                <span>Eligible for instant delivery</span>
                                            </p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 smLp-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">Subtotal</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {isMouted ? 
                                    formatPrice(2)
                                    : 
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/>}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <span>Falt Transaction Fee</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                    {isMouted ? 
                                    formatPrice(fee) 
                                    : 
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="text-base font-medium text-gray-900">Order Total</div>
                                <div className="text-base font-medium text-gray-900">
                                {isMouted ? 
                                    formatPrice(2 + fee) 
                                    : 
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button 
                            // disabled={items.length === 0 || isLoading}
                            // onClick = {()=> createCheckoutSessions({productIds})}className="w-full" 
                            size='lg'
                            >
                                {/* {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5"/> : null} */}
                                Checkout
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )

}
export default Cart