
import OrderList from "@/components/OrderList"
import { Link } from "react-router-dom"
import useGetOrders from "@/่hooks/useGetOrders"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useMemo } from "react"
import hippoPic from '../assets/hippo-email-sent.png';
import { Order } from "@/lib/Basket.type"
import { Skeleton } from "@/components/ui/skeleton"
const BREADCRUMBS = [
  {id: 1, name: "HOME", href: "/"},
  {id:2, name:"ORDER", href: "/checkout"}
]


const Checkout = ()=> {
    const {currentUser} = useSelector((state:RootState)=> state.user)

    const {data, isLoading} = useGetOrders(currentUser?.message?._id as string);
    const orders:Order[]= useMemo(()=>data?.data || [], [data])
    console.log(orders)
    let filteredOrders:Order[] = []
    if(orders.length>0){
         filteredOrders = orders.filter(order=>order.orderStatus === "ORDER_CREATED" )
    }
    if(isLoading) return <Skeleton></Skeleton>
  return  (
    <div className="bg-white mx-auto w-full max-w-screen-xl px-2.5 md:px-20 mb-5">
        <div className="bg-white ">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-6 lg:px-8">
                {/* Product Details */}
                <div className="lg:max-w-md lg-self-end">
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
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
                            ORDER 
                        </h1>
                    </div>
                </div>
            </div>
            {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                    <OrderList
                    key={order.orderId}
                     order={
                        
                        order
                    }/>
                )) 
            ):
            (
                <div className="flex h-full flex-col items-center justify-center space-y-1 ">
                <div 
                    aria-hidden="true"
                    className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <img 
                    src={hippoPic}
                    alt="empy shopping cart hippo"
                    />
                </div>
                <div className="text-xl font-semibold"> Your Order is empty</div>
            </div>
            )}
        
        </div> 
    </div>
    )
}

export default Checkout