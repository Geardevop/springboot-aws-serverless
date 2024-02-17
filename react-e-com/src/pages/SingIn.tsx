import { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { signInStart, signInFailure, signInSuccess } from "@/redux/user/userSlice"
import {useDispatch, useSelector} from "react-redux"
import {RootState, AppDispatch} from '../redux/store'
import OAuth from "@/components/OAuth"
import { Icons } from "@/components/Icons"
import { Label } from "@radix-ui/react-dropdown-menu"
export default function SignIn() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({})
  const {loading} = useSelector((state:RootState)=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e :React.FormEvent<HTMLInputElement>) =>{
    setFormData({...formData, [e.currentTarget.id]:e.currentTarget.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
      dispatch(signInStart())
      const res = await fetch("http://localhost:3000/api/auth/signin", 
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
        body : JSON.stringify(formData)
      })

      const data = await res.json()
    if(data.statusCode === 200){
      dispatch(signInSuccess(data))
      toast({
        title: "success fully login",
        description: "เข้าสู่ระบบสำเร็จ",
      })
      navigate("/")
    }
    else{
      dispatch(signInFailure(data))
      toast({
        title: "Fail to login",
        description: data.message,
      })
    }
    console.log(data)
  }
  console.log(formData)
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-enter">
            <Icons.logo className="h-20 w-20"></Icons.logo>
            <h1 className="text-2xl font-bold">
                    Sing in to your account.
            </h1>
        </div>
        <div className="grid gap-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1 py-2">
            <Label>Email</Label>
            <input type='text' placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-md"
            onChange={handleChange}
            />
          </div>
          <input type='text' placeholder="password" id="password" className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          />
          <button className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-90">{loading? 'Loading..':'SIGN IN'}</button>
          <OAuth/>
        </form>
        </div>
        <div className="flex gap-2 mt-5">
          <p>Don't Have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
