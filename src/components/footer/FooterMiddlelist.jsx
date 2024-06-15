import React from 'react'

const FooterMiddlelist = ({title,listItem}) => {
   
  return (
    <div className=' w-full'>
    <h3 className='text-whiteText font-titleFont text-base font-semibold mb-3 '>{title} </h3>
    <ul className='flex flex-col gap-2 font-bodyFont'>
     {
        listItem.map((item)=>item.listData.map((data,i)=>(
            <li key={i} className='footerlink'>{data} </li>
            ))
        )
     }
    </ul>
    
   </div>
  )
}

export default FooterMiddlelist
