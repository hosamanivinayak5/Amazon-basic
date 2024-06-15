import React from 'react'
import { middleitems } from '../../constants'
import FooterMiddlelist from './FooterMiddlelist'
import { indflag, logo} from "../../assets/index"
const FooterMiddle = () => {
  return (
    <div className='w-full bg-amazon_light text-white'>
   <div className='w-full border-b-[1px] border-gray-500 p-10'>
    <div className='max-w-5xl mx-auto text-gray-300'>
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:place-items-center md:items-start'>
   {
         middleitems.map((item)=>((
          <FooterMiddlelist key={item._id} title={item.title} listItem={item.listitem} />
         )))
     
   }
   </div>
    </div>
    </div> 
    <div className='w-full flex gap-6 items-center justify-center py-6'>
      <div>
        <img src={logo} className='w-20 pt-3' ></img>
      </div>
      <div className='flex gap-2'>
        <p className='flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 
        px-2 py-1'>English</p>
      </div>
      <div className='flex gap-3 items-center justify-center border border-gray-500 hover:border-amazon_yellow  
      cursor-pointer px-2 py-1 duration-200'>
        <img src={indflag} className='w-6'/>
        <p>India</p>
      </div>
      </div>     
    </div>
  )
}

export default FooterMiddle
