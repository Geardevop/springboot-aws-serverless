
import type { Error } from '../types/Error.type';
export const errorHandler = (status : number, message : string) =>{
    const error : Error = {
        status: status,
        message: message
    }
    return error
}