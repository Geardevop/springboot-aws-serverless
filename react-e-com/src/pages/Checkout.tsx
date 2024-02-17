import { Button, buttonVariants } from "../components/ui/button"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetOrdersByOrderId from '@/่hooks/useGetOrderByOrderId';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Order } from "@/lib/Basket.type"
import OrderItem from '@/components/OrderItem';
import { formatPrice } from "@/lib/utils";
import usePaymentCheckout from "@/่hooks/usePaymentChecout";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Checkout() {
    const {id} = useParams()
    const {currentUser} = useSelector((state:RootState)=> state.user)
    console.log(id)
    const {data} = useGetOrdersByOrderId(currentUser?.message?._id as string, id as string );
    const order:Order= useMemo(()=>data?.data || [], [data])
    console.log(order)
    // const {data} = userGet
    const paymentCheckout = usePaymentCheckout(currentUser?.message?._id as string)
    const {toast} = useToast()
    const [formData, setFormData] = useState<{[key: string]: string}>({})
    const handleChange = (e :React.FormEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.currentTarget.id]:e.currentTarget.value})
      }
    const navigate = useNavigate(); 
    const routeChange = (orderId:string) =>{ 
        const path = `/thankyou/${orderId}`; 
        navigate(path);
      }

    
    console.log(formData)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cardNumber = formData["card"]
        const mmYY = formData["mmyy"]
        const cvv = formData["cvv"]
        const payload = {
            cardInfo: cardNumber,
            mmyy: mmYY,
            cvv:cvv
        }
        const fetchData = async (orderId:string) => {
                try {
                    await axios.put(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/order/api/update?orderId=${orderId}&customerId=${currentUser?.message._id}`);
                  
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
        };
        paymentCheckout.mutate(
            payload,
            {
                onSuccess: ()=>{
                   fetchData(order.orderId)
                    toast({
                        title: "สั้งซื้อสำเร็จ",
                      })
                    routeChange(order.orderId)

                },
                onError:()=>{
                    toast({
                        title: "สั้งซื้อไม่สำเร็จ",
                      })
                }
            }
        )

    };
  return (
      <main className='relative lg:min-h-full'>
        <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
            <div className='flex flex-col align-middle w-full items-center mt-20'>
                <div className="bg-slate-50 p-5 rounded-lg mt-16">
                <div className="mb-4 text-lg uppercase">
                order id : {order.orderId}
                </div>
                {order.product && order.product.map(product => (
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
                </div>
            </div>
        </div>
        </div>
        <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <div >
                <p className='text-sm font-medium mb-12 text-center'>
                Pay with Card
                </p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6 items-center'>
                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Card">Card information</Label>
                    <Input type="text" id="card" placeholder="1234 1234 1234 1234" onChange={handleChange}/>
                    <div className='flex'>
                        <Input type="text" id="mmyy" placeholder="MM/YY" onChange={handleChange}/>
                        <Input type="textl" id="cvv" placeholder="CVV"onChange={handleChange} />
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                    <Label htmlFor="email">Name on Card</Label>
                    <Input type="email" id="email"  />
                </div>
            </div>
            <div className='mt-16 text-sm font-medium'>
              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
              <Button className={buttonVariants({
                                    className : "w-full bg-blue-200 mt-5  mr-5"
                                })}
                                type="submit"
                                >Pay</Button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

