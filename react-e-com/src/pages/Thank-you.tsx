import checkoutThankYouImage from '../assets/checkout-thank-you.jpg';
import { useSelector } from "react-redux"
import useGetOrdersByOrderId from '@/่hooks/useGetOrderByOrderId';
import { useParams } from 'react-router-dom';
import { Order } from "@/lib/Basket.type"
import { useMemo } from 'react';
import { RootState } from "@/redux/store"
import { formatPrice } from '@/lib/utils';
export default function Thankyou() {
  const {id} = useParams()
  const {currentUser} = useSelector((state:RootState)=> state.user)
  const {data} = useGetOrdersByOrderId(currentUser?.message?._id as string, id as string );
    const order:Order= useMemo(()=>data?.data || [], [data])
  return (
      <main className='relative lg:min-h-full'>
        <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
          <img
            src={checkoutThankYouImage}
            className='h-full w-full object-cover object-center'
            alt='thank you for your order'
          />
        </div>
        <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium text-blue-600'>
              Order successful
            </p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Thanks for ordering
            </h1>
            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>
                Order nr. {order.orderId}
              </div>
              <div className='mt-2 text-gray-900'>
              </div>
              <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
              {order.product && order.product.length > 0  && order.product.map(product =>(
                    <div key={product.product_id}>
                      <div className='flex-auto flex flex-col justify-between'>
                        <div className='space-y-1'>
                          <h3 className='text-gray-900'>
                            Product Name: {product.product_name}
                          </h3>
                        </div>
                      </div>
                      <p className='flex-none font-medium text-gray-900'>
                        Product Price: {formatPrice(product.product_price)}
                      </p>
                    </div>
              ))}
              </ul>
              <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p className='text-gray-900'>
                    {formatPrice(order.orderTotalPrice)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p>Transaction Fee</p>
                  <p className='text-gray-900'>
                    {formatPrice(1)}
                  </p>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                  <p className='text-base'>Total</p>
                  <p className='text-base'>
                    {formatPrice(order.orderTotalPrice + 1)}
                  </p>
                </div>
              </div>
              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
