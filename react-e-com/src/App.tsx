
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingIn from './pages/SingIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Thankyou from './pages/Thank-you';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
function App() {

  return (
   <BrowserRouter>
    <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/sign-in" element={<SingIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
    </Route>
    <Route path='/product/:id'element={<Product/>}></Route>
    <Route path='/thankyou/:id' element={<Thankyou/>}/>
    <Route path="/order" element={<Order/>}></Route>
    <Route path='cart' element={<Cart/>}/>
    <Route path='/checkout/:id'element={<Checkout/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;