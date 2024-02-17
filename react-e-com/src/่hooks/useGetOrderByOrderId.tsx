import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const useGetOrdersByOrderId = (customerId : string, orderId:string) =>{
    const orderIdLowerCase = orderId.toLowerCase()
    console.log(orderIdLowerCase)
    return useQuery({   
        queryKey: ['getOrder', orderId, customerId],
        queryFn : async () =>{
            return axios.get(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/order/api/?orderId=${orderIdLowerCase}&customerId=${customerId}`)
        }
    })
}
export default useGetOrdersByOrderId