import {logo} from "../../assets/index"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useRef, useState ,useEffect} from "react";
import { allitems } from "../../constants/index";
import HeaderBottom from "./HeaderBottom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Oval } from 'react-loader-spinner';

import LogoutIcon from '@mui/icons-material/Logout';
import { usersignout } from "../../redux/amazonslice";
const Header =()=>{
  const auth = getAuth();
  const ref = useRef();
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [showall,setshowall]=useState(false)
  const products=useSelector((state)=>state.amazon.products)
  const userInfo =useSelector((state)=>state.amazon.userInfo)

   
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showall && setshowall(false);
      }
    });
  }, [ref, showall]);
 const logout=()=>{
  signOut(auth).then(() => {
    
    // Sign-out successful.
      dispatch(usersignout())
    console.log("signed out succesfully")
    navigate("/")
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
  // console.log("done")
  
 }
    return(
<div className="w-full sticky top-0 z-50">
  <div className="bg-amazon_blue w-full text-white px-4 py-3 flex items-center gap-4">
        <Link to="/">
        <div className="headerHover">
            <img className="w-24 mt-2" src={logo} />
        </div>
        </Link>
        <div className="headerHover hidden mdl:inline-flex">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
</svg>
  <p className="text-sm text-lighttext font-light flex flex-col">   
    Deliver to <span className="text-sm font-semibold -mt-1 text-whiteText">India</span></p>
        </div>
      <div className="h-10 rounded-md flex flex-grow relative">
        <span  onClick={()=>{
          setshowall(!showall)
        }} className="w-14 h-full bg-gray-200  hover:bg-gray-200 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md">All <span></span><ArrowDropDownIcon/></span>
        {
          showall&&(
            <div>
              <ul ref={ref} 
              className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-x-amazon_blue text-black p-2 flex-col gap-1 z-50">
              {
                allitems.map((item)=>(
                  <li key={item._id} className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200">
                    {item.title}</li>
                ))
              }
              </ul>
            </div>
          )
        }
        <input type="text" className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2" />
        <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow cursor-pointer rounded-tr-md rounded-br-md"> <SearchIcon/> </span>
        </div>  
        <Link to='/signin'>
        <div className="flex flex-col items-start justify-center headerHover ">
          {
            userInfo?
            <p className="text-xs  text-lighttext font-light">
             {userInfo.username}
            </p>
            
            : 
            <p className="text-xs text-lighttext font-light hidden lgl:inline-flex">Hello,sign in</p>
          }
         
          <p className="text-sm font-semibold -mt-1 text-whiteText hidden lgl:inline-flex"> Accounts & lists {""}
          <span><ArrowDropDownIcon/></span>
          </p>
        </div>
        </Link>
        <div className="flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lighttext font-light hidden lgl:inline-flex">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText hidden lgl:inline-flex">& Orders</p>
        </div>
        <Link to='/cart'>
        <div className="flex  items-start justify-center headerHover relative">
          <ShoppingCartIcon/>
          <p className="text-xs font-semibold mt-3 text-whiteText">Cart 
          <span className="text-amazon_blue rounded-full flex justify-center items-center absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847]">
            {products.length>0?products.length:0}
            </span> </p>
        </div>
        </Link>
        {
          userInfo&& ( <div className="flex flex-col items-start justify-center headerHover" onClick={logout}>
              <LogoutIcon/>
          </div>)
        }
        
  </div>
  <HeaderBottom/>
</div>
    )
}
export default Header;