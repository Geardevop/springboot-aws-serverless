import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const useGetOrders = (customerId : string) =>{
    return useQuery({
        queryKey: ['getOrder', customerId],
        queryFn : async () =>{
            return axios.get(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/order/api/customer?customerId=${customerId}`)
        }
    })
}
export default useGetOrders