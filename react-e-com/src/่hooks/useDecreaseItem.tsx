
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface CartPayload {
    customer_id: string;
    product: {
      product_id: string;
      product_name: string;
      product_detail: string;
      product_count: number;
      product_price: number;
    };
  }

const useDecreaseItem = (productId : string) =>{
    return useMutation<CartPayload, Error, CartPayload>({
            mutationKey: ["DecreaseItem", productId],
            mutationFn:(product) =>{
                return axios.put(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/basket/api/delete`, product)
            }
    })
}
export default useDecreaseItem