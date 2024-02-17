import {  X } from "lucide-react"
import type { Product } from "@/lib/Basket.type"
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import { formatPrice } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import {  useQueryClient } from '@tanstack/react-query'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import useDecreaseItem from "@/่hooks/useDecreaseItem";

const CartItem = ({product}:{product:Product})=>{

    const {toast} = useToast()
    const queryClient = useQueryClient();
    const {currentUser}  = useSelector((state:RootState)=> state.user)

    const decreaseItem = useDecreaseItem(product.product_id)

    const payload = {
            customer_id :currentUser?.message._id as string,
            product:{
                product_id : product.product_id,
                product_name : product.product_name,
                product_detail: product.product_details,
                product_count : 1,
                product_price : product.product_price,

            }
    }
    const handleDelItem = () => {
        decreaseItem.mutate(
         payload,
         {
             onSuccess: ()=>{
                 queryClient.invalidateQueries({
                     queryKey: ['getCart']
                 })
                 toast({
                     title: "เพิ่มสินค้าสำเร็จ",
                     description:"สินค้าอยู่ในตะกร้าแล้ว",
                   })
             }
         }
        )
    }
    return(
        <div className="space-y-3 py-2">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                        <img src={product.product_name == 'product1' ? product1 : product.product_name =='product2' ? product2 :product.product_name == 'product3' ? product3 : product.product_name == 'product4'? product4 : undefined } alt={product.product_name} className="absolute object-cover"/>
                    
                    </div>
                    <div className="flex flex-col self-start">   
                        <span className="line-clamp-1 text-sm font-medium mb-1">
                            {product.product_name}
                        </span>
                        <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                           {product.product_count}
                        </span>
                        <div className="mt-4 text-xs text-muted-foreground">
                            <button
                            onClick={handleDelItem}
                            className="flex items-center gap-0.5"
                            >
                                <X className="w-3 h-4"/>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 font-medium">
                    <span className="ml-auto line-clamp-1 text-sm">
                        {formatPrice(product.product_price)}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default CartItem