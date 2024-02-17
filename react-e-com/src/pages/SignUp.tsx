import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"
export default function SignUp() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [loading , setLoading] = useState(false)
  const handleChange = (e :React.FormEvent<HTMLInputElement>) =>{
    setFormData({...formData, [e.currentTarget.id]:e.currentTarget.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/auth/signup", 
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(formData)
      })

      const data = await res.json()
      setLoading(false)
    if(data.statusCode ===200){
      toast({
        title: "success fully create account",
        description: "ขอให้สนุกกับการช้อปปิ้ง",
      })
      navigate("/sign-in")
    }
    else{
      toast({
        title: "Fail to create account",
        description: "เกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง",
      })
    }
    console.log(data.statusCode)
  }
  console.log(formData)
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-enter">
            <Icons.logo className="h-20 w-20"></Icons.logo>
            <h1 className="text-2xl font-bold">
                    Create an account
            </h1>
        </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type='text' placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}
        />
        <input type='text' placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}
        />
        <input type='text' placeholder="password" id="password" className="bg-slate-100 p-3 rounded-lg"
        onChange={handleChange}
        />
        <button className="\ text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 bg-blue-500">{loading? 'Loading..':'SIGN UP'}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
    </div>
  )
}
