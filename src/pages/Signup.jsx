import React, { useState } from 'react'
import { darklogo } from '../assets'
import {motion} from "framer-motion"
import {Link, useNavigate} from "react-router-dom"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {Oval} from "react-loader-spinner"
const Signup = () => {
  const auth =getAuth();
  const navigate=useNavigate();
  const [clientname,setclientname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [cpassword,setcpassword]=useState("");

  const [errname,seterrname]=useState("");
  const [erremail,seterremail]=useState("");
  const [errpassword,seterrpassword]=useState("");
  const [errcpassword,seterrcpassword]=useState("");
   const [firebaseerr,setfirebaserrr]=useState("");

   const [loading,setloading]=useState(false);
   const [successmsg,setsuccessmsg]=useState("");

  const handleName=(e)=>{
     setclientname(e.target.value)
     seterrname("")
  }
  
  const handlesignup=(e)=>{
  e.preventDefault();
  if(!clientname)
    {
      seterrname("Enter your name");
    }
    if(!email)
      {
        seterremail("Enter email")
      }
    else{
      if(!emailvalidation(email))
        {
          seterremail("Invalid EMail")
          setfirebaserrr("");
        }
    }
    if(!password)
    {
      seterrpassword("Enter password")
    }
    else{
      if(password.length<6)
        {
          seterrpassword("Password must be atleast 6 characters")
        }
    }
    if(!cpassword)
      {
        seterrcpassword("Enter c password")
      }
    else
    {
      if(cpassword!==password)
        {
          seterrcpassword("Password did not match")
        }
    }
    
    if(clientname&&email&&emailvalidation(email)&&password&&password.length>=6 &&cpassword&& cpassword==password)
      {
        console.log(clientname,email,password,cpassword);
        setloading(true);
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    updateProfile(auth.currentUser, {
      displayName:clientname, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    
    // Signed up 
    const user = userCredential.user;
   
    setloading(false);
    setsuccessmsg("Account Created successfull") 
     setTimeout(()=>{
      navigate("/signin")
     },3000)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode.includes("auth/email-already-in-use"))
      {
        setfirebaserrr("Email Already in use,Try another one")
      }
    // ..
  });
        setclientname("");
        setemail("");
        setpassword("");
        setcpassword("");
        setfirebaserrr("");
      }
  }  
  const handleEmail=(e)=>{
   setemail(e.target.value)
   seterremail("");
  }
  const handlePassword=(e)=>{
    setpassword(e.target.value);
    seterrpassword("");
  }
  const handlecPassword=(e)=>{
    setcpassword(e.target.value);
    seterrcpassword("");
  }
  const emailvalidation=(email)=>{

    return String(email).toLowerCase() .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  }
  return (
    <div className='w-full'>
      <div>
        <form className='w-[350px] mx-auto flex flex-col items-center'>
        <Link to="/">   <img className='w-32' src={darklogo} alt="darklogo" /> </Link> 
        
        <div className='w-full border-zinc-200 p-6'>
            <h2 className=' font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
            <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm'> Enter your name</p>
                <input  value={clientname} onChange={handleName} className='w-full  py-1 border border-zinc-400 px-2
                focus-within:border-[#e77600] rounded-sm outline-none text-base
                 focus-within:shadow-amazonInput duration-100' type="text"  />
                 {
                  errname&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>
                      {errname} </p>
                  )
                 }
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm'> Enter Email or Mobile no.</p>
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
                 firebaseerr&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {firebaseerr} </p>
                  )
                 }
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm'>Enter Password</p>
                <input value={password} onChange={handlePassword} className='w-full  py-1 border border-zinc-400 px-2
                focus-within:border-[#e77600] rounded-sm outline-none text-base
                 focus-within:shadow-amazonInput duration-100' type="password"  />
                 {
                  errpassword&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {errpassword} </p>
                  )
                 }
              </div> 
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-sm'>Re-Enter Password</p>
                <input value={cpassword} onChange={handlecPassword} className='w-full  py-1 border border-zinc-400 px-2
                focus-within:border-[#e77600] rounded-sm outline-none text-base
                 focus-within:shadow-amazonInput duration-100' type="password"  />
                 {
                  errcpassword&&(
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>
                    {errcpassword} </p>
                  )
                 }
              <p className="text-xs text-gray-600">Passwords must be atleast characters</p>
              </div>
        
              <button onClick={handlesignup} className='w-full bg-yellow-400 rounded-sm py-1.5 text-sm font-normal bg-gradient-to-t from-[#f7dfa5]
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
            <div>
                <p className='text-xs text-black'>Already have an account 
                  <Link to="/signin">
                  <span  className="text-xs text-blue-600
                 hover:text-orange-600 hover:underline underline-offset-1
                  cursor-pointer duration-100">Sign in {" "}<span> <ArrowRightIcon/>
                   </span>
                    </span> 
                    </Link>
                    </p>
                  <p className="text-xs text-black -mt-2">
                Buying for work?{" "}
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
            </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  )
}

export default Signup
