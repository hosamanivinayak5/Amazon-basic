import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { darklogo } from '../assets'
import {motion} from "framer-motion"
import {useDispatch} from "react-redux"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Oval } from 'react-loader-spinner';
import { setuserinfo } from '../redux/amazonslice'
const Signin = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const auth = getAuth();
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [erremail,seterremail]=useState("")
  const [errpassword,seterrpassword]=useState("");
const [useremailerr,setuseremailerr]=useState("");
const [userpassworderr,setuserpassworderr]=useState("");
  const [loading,setloading]=useState(false);
   const [successmsg,setsuccessmsg]=useState("");
const handleEmail=(e)=>{
  setemail(e.target.value);
  seterremail("");
}
const handlepassword=(e)=>{
   setpassword(e.target.value);
   seterrpassword("");
}
  const handleSignin=(e)=>{
    e.preventDefault();
    if(!email)
      {
        seterremail("Enter email");
      }
    if(!password)
      {
        seterrpassword("Enter password"); 
      }
      if(email&&password)
        {
          // console.log(email,password)
          setloading(true)
          signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch(setuserinfo({
      id:user.uid,
      username:user.displayName,
      email:user.email,
      image:user.photoURL
    }))
    setloading(false);

    setsuccessmsg("signed in succesfully")
    setTimeout(()=>{
      navigate("/")
    },3000)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloading(false);
    if(errorCode.includes("auth/invalid-email"))
    {
     setuseremailerr("Invalid email");
    }
    if(errorCode.includes("auth/wrong-credential"))
      {
       setuserpassworderr("Invalid password");
      }
   
    console.log("someting is up try with correct credentialss")
  });
          setemail("");
          setpassword("");
        }
  }
  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        {
          successmsg?<div className=' w-full flex justify-center items-center py-32'>
             <p className='border-[1px] border-green-600 text-green-500 font-titleFont
             text-lg font-semibold px-6 py-2'>  
              {successmsg}
             </p>
          </div>:
          (<form className='w-[350px] mx-auto flex flex-col items-center' >
       <Link to="/">   <img className='w-32' src={darklogo} alt="darklogo" /> </Link> 
          <div className='w-full border-zinc-200 p-6'>
            <h2 className=' font-titleFont text-3xl font-medium mb-4'>Sign In</h2>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm'>Email or Mobile no.</p>
                <input value={email} onChange={handleEmail} className='w-full lowercase py-1 border border-zinc-400 px-2
                focus-within:border-[#e77600] rounded-sm outline-none text-base
                 focus-within:shadow-amazonInput duration-100' type="email"  />
                   {
                  erremail&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {erremail} </p>
                  )
                 }  
                 {
                  useremailerr&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {useremailerr} </p>
                  )
                 }
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm'>Password</p>
                <input value={password} onChange={handlepassword} className='w-full lowercase py-1 border border-zinc-400 px-2
                focus-within:border-[#e77600] rounded-sm outline-none text-base
                 focus-within:shadow-amazonInput duration-100' type="password"  />
                  {
                  errpassword&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {errpassword} </p>
                  )
                 }
                 {
                  userpassworderr&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {userpassworderr} </p>
                  )
                 }
              </div>
              <button onClick={handleSignin} className='w-full bg-yellow-400 rounded-sm py-1.5 text-sm font-normal bg-gradient-to-t from-[#f7dfa5]
              to-[#fc14b] hover:bg-gradient-to-b border border-zinc-400 active:shadow-amazonInput
              cursor-pointer  active:bg-yellow-800'>
                Continue
              </button>
              {
                loading&&(
                  <div className='flex justify-center'>
                   (<Oval  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
  />)

                    </div>
                )
              }
              {
                successmsg&&(
                  <div>
                    <motion.p
                    initial={{y:10,opacity:0}}
                    animate={{y:0,opacity:1}}
                    transition={{duration:0.5}}
                    className='text-base font-titleFont font-semibold text-green-500 border-[1px]
                    border-green-500 px-2 text-center'
                    > {successmsg} </motion.p>
                  </div>
                )
              }
            </div>
            <p className='text-xs text-black leading-4 mt-4'>By continuing,you agree to Amazon's <span className=' text-blue-600'> Condition of use{" "} </span> and 
           {" "} <span className=' text-blue-600'>Privacy Notice</span>
            </p>
            <p className='text-xs text-gray-600 mt-4 cursor-pointer group'><ArrowRightIcon/> <span
            className=' text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1'>Need Help?</span> </p>
          </div>
          <p className=' w-full text-xs text-gray-600 mt-4 flex items-center'>
          <span className=' w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
            <span className=' w-1/3'>New to Amazon?</span>
            <span className=' w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
          </p>
   <Link to="/signup" className='w-full '>      <button 
          className="w-full py-1.5 mt-4 text-sm font-normal 
         rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
          Create Your Amazon account</button></Link>
        </form>)
        }
         
      </div>
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4
       justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
        <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use</p>
            <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice</p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  )
}

export default Signin
