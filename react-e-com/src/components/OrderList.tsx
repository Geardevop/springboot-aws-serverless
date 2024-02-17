import React from 'react'
import OrderItem from "@/components/OrderItem"
import { Order } from '@/lib/Basket.type'
import { formatPrice } from '@/lib/utils'
import { Button, buttonVariants } from "./ui/button"
interface OrderListProp {
  order : Order
}
import { useNavigate } from 'react-router-dom'
export default function OrderList({order}:OrderListProp) {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 p-5 rounded-lg mt-16">
        <div className="mb-4 text-lg uppercase">
        order id : {order.orderId}
        </div>
          {order.product.map(product => (
            <OrderItem product={product} key={product.product_id}/>
          ))}
            
        <div>
        <div className="flex flex-row space-y-1 font-medium">
            <div  className=' line-clamp-1 text-lg'>
              ราคาทั้งหมด
            </div>
            <span className="ml-auto line-clamp-1 text-lg">
                            {formatPrice(order.orderTotalPrice)}
                            
            </span>
            
        </div>
        
        {order.orderStatus == 'ORDER_CREATED' ? (
          <Button className={buttonVariants({
                                    className : "w-full bg-blue-200 mt-5  mr-5"
                                })}
                                onClick={()=>navigate(`/checkout/${order.orderId}`)}
                                >continue to Checkout</Button>
        ):
        (
          <div className='text-lg w-full bg-blue-200 mt-5  mr-5'>
            การสั้งซื้อเรียบร้อย
          </div>
        )}
        </div>
    </div>
  )
}
