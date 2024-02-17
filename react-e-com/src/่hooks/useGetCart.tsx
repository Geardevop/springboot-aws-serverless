import { useQuery } from "@tanstack/react-query"
import axios from "axios";


const useGetCart = (userId : string | undefined) =>{
    console.log(userId);
    return useQuery({
        queryKey: ['getCart'],
        queryFn : async () =>{
            return axios.get(`https://0k97motsgg.execute-api.us-east-1.amazonaws.com/prod/basket/api?customerId=${userId}`)
        }
    })
}

export default useGetCart