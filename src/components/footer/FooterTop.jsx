import React from 'react'
import {Link} from "react-router-dom"
import Signin from '../../pages/Signin'
import { useSelector } from 'react-redux'
const FooterTop = () => { 
   const userInfo=useSelector((state)=>state.amazon.userInfo);
  return (
    <div className='w-full bg-white py-6'>
      <div className='w-full border-t-[1px] border-b-[1px] py-8'>
       
            {
              userInfo?null:(
                <div className='w-64 mx-auto text-center flex flex-col gap-1'>
            <p>See personalize Recommandation </p>
                <Link to='/signin'>
                <button className='w-full bg-yellow-400 rounded-md py-1 font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700'>Sign in</button>
                </Link>     
              <p className='text-xs mt-1'>New Customer ?{" "} <span className='text-blue-600 ml-1 cursor-pointer'>Start here</span> </p>
              </div>
              )
            }
    

        
      </div>
    </div>
  )
}

export default FooterTop
