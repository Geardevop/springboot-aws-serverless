
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import useIncreaseItem from "@/่hooks/useIncreaseItem";
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useToast } from "./ui/use-toast";
import {  useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
interface AddButton {
    product_id: string,
    product_name: string,
    product_detail :string,
    product_price:number
}

const AddToCartButton = ({
    product_id  , 
    product_name , 
    product_detail ,
    product_price  
}:AddButton)=>{
    const {toast} = useToast()
    const queryClient = useQueryClient();
    const {currentUser}  = useSelector((state:RootState)=> state.user)
    const inCreaetItem = useIncreaseItem(product_id )
    const payload = {
            customer_id :currentUser?.message._id as string,
            product:{
                product_id : product_id,
                product_name : product_name,
                product_detail: product_detail,
                product_count : 1,
                product_price : product_price,

            }
    }
    const navigate = useNavigate(); 
    const routeChange = () =>{ 
        const path = `/sign-in`; 
        navigate(path);
    }
    const handleAddItem = () => {
        if(currentUser?.message == null) {
            routeChange()
        }
       inCreaetItem.mutate(
        payload,
        {
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ['getCart']
                })
                toast({
                    title: "เพิ่มสินค้าสำเร็จ",
                  })
            }
        }
       )
    };

    
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setIsSuccess(false)
        }, 2000)

        return ()=> clearTimeout(timeOut)
    },[isSuccess])
    return(
        <Button 
        onClick={handleAddItem}
        size='lg'
        className="w-full">{isSuccess ? "Added!" : 'Add to Cart'}</Button>
    )
}
export default AddToCartButton;