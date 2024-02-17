import { createSlice} from "@reduxjs/toolkit";

interface CurrentUser {
    currentUser : null | Message,
    loading : boolean,
    error: boolean
  

}

interface Message {
    message :{
        _id: string;
        username: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }
    // Add other properties as needed
}
const initialState = {
    currentUser : null ,
    loading : false,
    error : false
} as CurrentUser

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart : (state) =>{
            state.loading = true
        },
        signInSuccess : (state, action) =>{
            state.currentUser = action.payload
            state.loading = false,
            state.error = false
        },
        signInFailure: (state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions

export default userSlice.reducer