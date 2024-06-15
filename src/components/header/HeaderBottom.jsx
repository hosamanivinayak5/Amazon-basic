import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {motion }from "framer-motion"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidenav from './Sidenav';
import { useSelector } from 'react-redux';
const HeaderBottom = () => {
  const ref=useRef();
  const userInfo=useSelector((state)=>state.amazon.userInfo)
    const [sidenav,setsidenav]=useState(false);
    useEffect(()=>{
     document.body.addEventListener("click",(e)=>{
      if(e.target.contains(ref.current))
        {
          setsidenav(false);
        }
     })
    },[])
  return (
    <div className="px-4 bg-amazon_light text-white flex items-center h-[36px] w-full ">
      <ul className=' flex items-center gap-2 text-sm tracking-wide'>
      <li className='headerHover' onClick={()=>{
        setsidenav(true)
      }}> <MenuIcon/> ALL</li>
      <li className='headerHover hidden mdl:inline-flex'>Fresh</li>
      <li className='headerHover hidden mdl:inline-flex'>Home & Kitchen</li>
      <li className='headerHover hidden mdl:inline-flex'>Amazon Pay</li>
      <li className='headerHover hidden mdl:inline-flex'>Today's Deals</li>
      <li className='headerHover hidden mdl:inline-flex'>Prime</li>
      <li className='headerHover hidden mdl:inline-flex'>Amazon miniTV</li>
      </ul>
      {
        sidenav&&(
            <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 scrollbar scrollbar-thumb-amazon_blue'>
              <div className='w-full h-full relative '>
                <motion.div initial={{x:-500,opacity:0}} ref={ref} animate={{x:0,opacity:1}} transition={{duration:.5}} className='w-[80%] md:w-[350px] h-full bg-white border border-black'>
                  <div className='w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4'>
                     <AccountCircleIcon/>
                     {
                      userInfo?<h3 className='text-lg font-titleFont font-bold tracking-wide'>
                        {userInfo.username}
                      </h3>:
                     <h3 className='text-lg font-titleFont font-bold tracking-wide'>Hello, Sign in</h3>

                     }
                  </div>
                  <Sidenav title='Trending' one='Best Sellers' two='New Releases' three="Movers and Shakers" />
                  <Sidenav title='Digital Content and Devices' one='Echo & Alexa' two='Fire TV' three="Amazon Prime Video" />
                  <Sidenav title='Shop by Category' one='Mobiles, Computers' two='TV, Appliances, Electronics' three="Men's Fashion" />
                  <Sidenav title='Programs & Features' one='Amazon Pay' two='Gift Cards & Mobile Recharges' three="Amazon Launchpad" />
                  <Sidenav title='Help & Settings' one='Your Account' two='Customer Service' three="Sign Out" />
                  <span onClick={()=>{
                  setsidenav(false)
                }} className='cursor-pointer absolute top-0  left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'>
                <CloseIcon/>
                </span>
                </motion.div>
               
              </div>
           </div>
        )
      }
    </div>
  )
}

export default HeaderBottom
