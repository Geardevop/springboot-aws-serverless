import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Cart from "./Cart"
export default function Header() {

  const {currentUser} = useSelector((state:RootState)=> state.user)
  return (
    <div className='bg-slate-100'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Digital Gear</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/order">
            <li>Order</li>
          </Link>
          {currentUser ? null : <div className="flex lg:ml-6">
          <span className="h-6 w-px bg-gray-200" aria-hidden='true'></span>
          </div>}
          <div >
            {
              currentUser ?
              <div className="ml-4 flow-root lg:ml-6">
              <Cart/>
              </div>: null
            }
          </div>
        
          <Link to="/profile">
            {currentUser ? 
              (<Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              ) : 
              (
              <li>Sign In</li>
              )
            }
          </Link>
        </ul>
      </div>
    </div>
  )
}
