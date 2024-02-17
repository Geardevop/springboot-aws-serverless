
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface CheckoutPayload {
    customer_id: string;
}
const useCheckout = () =>{
    return useMutation<CheckoutPayload , Error, CheckoutPayload >({
            mutationKey: ["Checkout"],
            mutationFn:(payload) =>{
                return axios.post(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/basket/api/checkout`, payload)
            }
    })
}
export default useCheckout