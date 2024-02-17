
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface PaymentCheckoutPayload {
    cardInfo: string;
    mmyy: string,
    cvv:string
}
const usePaymentCheckout = (customerId:string) =>{
    return useMutation<PaymentCheckoutPayload, Error, PaymentCheckoutPayload>({
            mutationKey: ["PaymentCheckout", customerId],
    
            mutationFn:(payload) =>{
                console.log(payload)
                return axios.put(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/payment/api/checkout`, payload)
            }
    })
}
export default usePaymentCheckout