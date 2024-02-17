
import { ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import hippoPic from '../assets/hippo-email-sent.png';
import { Button, buttonVariants } from "./ui/button"
import { RootState } from "@/redux/store"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import type { Basket } from "@/lib/Basket.type";
import CartItem from "./CartItem";
import useGetCart from "@/่hooks/useGetCart";
import useCheckout from "@/่hooks/useCheckout";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import {  useQueryClient } from '@tanstack/react-query'
const Cart = () =>{
    const queryClient = useQueryClient();
    const {toast} = useToast()
    const {currentUser}  = useSelector((state:RootState)=> state.user)
    const [isMouted , setIsMouted] = useState<boolean>(false)
    const fee =1
    console.log(currentUser?.message?._id)
    const {data} = useGetCart(currentUser?.message?._id);
    const basket:Basket = useMemo(()=> data?.data || [], [data])
    
    useEffect(() => {
        // Define the function to fetch basket data
        setIsMouted(true)
        }, [currentUser]);
    console.log(basket)
    
    const checkout = useCheckout();
    const payload = {
        "customer_id" : currentUser?.message._id  as string
    }
    const navigate = useNavigate(); 
    const routeChange = () =>{ 
      const path = `/order`; 
      navigate(path);
    }
    const handleCheckout = () => {
        checkout.mutate(
         payload,
         {
             onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ['getCart']
                })
                queryClient.invalidateQueries({
                    queryKey: ['getOrder', currentUser?.message._id as string]
                })
                routeChange(),
                toast({
                     title: "สั้งซื้อสำเร็จ",
                   })
             }

         }
        )
    }
    return (
    <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingCart  
                aria-hidden="true" 
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {isMouted ? basket?.product_list?.length : 0}
            </span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-white">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle>Cart({basket?.product_list?.length})</SheetTitle>
            </SheetHeader>
            {basket?.product_list?.length && basket.product_list.length > 0 ? (
                <>
                    <div className="flex w-full flex-col pr-6 bg-white">
                        <ScrollArea>
                            {basket.product_list.map(product =>(
                                <CartItem product={product} key={product.product_id}/>
                            ))}
                        </ScrollArea>
                        cart items
                    </div>
                    <div>
                        <Separator/>
                        <div className="space-y-1.5 pr-6">
                            <div className="flex">
                                <span className="flex-1">Shopping</span>
                                <span >Free</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Transaction</span>
                                <span >{formatPrice(fee)}</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Total</span>
                                <span >{formatPrice(basket.total_price + fee)}</span>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetTrigger asChild>
                              <Button className={buttonVariants({
                                    className : "w-full bg-blue-200 mt-5  mr-5"
                                })}
                                onClick={handleCheckout}
                                >สั้งซื้อ</Button>
                            </SheetTrigger>
                        </SheetFooter>
                    </div>
                </>
            ) :(
            <div className="flex h-full flex-col items-center justify-center space-y-1 ">
                <div 
                    aria-hidden="true"
                    className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <img 
                    src={hippoPic}
                    alt="empy shopping cart hippo"
                    />
                </div>
                <div className="text-xl font-semibold"> Your Cart is empty</div>
                <SheetTrigger asChild>
                    <Link to="/product" className={buttonVariants({
                        variant: "link",
                        size : "sm",
                        className: "text-sm text-muted "
                    })}>
                        Add item to your cart to checkout
                    </Link>
                </SheetTrigger>
            </div>)}
        </SheetContent>
    </Sheet>
    )
}
export default Cart