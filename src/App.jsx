

import './App.css'

import Footer from './components/footer/Footer'

import Header from './components/header/Header'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Outlet,
  ScrollRestoration ,
} from "react-router-dom";
import Home from './pages/Home';
import { productsdata } from './api/api';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const Layout=()=>{
  return(
  <div>
  <Header/>
  <ScrollRestoration/>
  <Outlet/>
  <Footer/>
  </div>)
}

function App() {
 const router=createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route path='/' element={<Layout/>} >
  <Route index element={<Home/>} loader={productsdata} />

  <Route path='cart' element={<Cart/>} />
  
  </Route>
  <Route path='signin' element={<Signin/>}/>
  <Route path='signup' element={<Signup/>}/>
</Route>
 ));
 
    return (
      <div className="font-bodyFont bg-gray-100">
        <RouterProvider router={router}></RouterProvider>
      </div>
    )

}

export default App
