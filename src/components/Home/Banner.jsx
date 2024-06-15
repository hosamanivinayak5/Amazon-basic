import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { bannerimg1, bannerimg2, bannerimg3, bannerimg4, bannerimg5 } from "../../assets";
import { responsiveProperty } from "@mui/material/styles/cssUtils";

const Banner = () => {
  const [dotactive,setdotactive]=useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforechange:(prev,next)=>{
     setdotactive(next)
    },
    appendDots: dots => (
      <div
        style={{
          position:"absolute",
          top:"75%",
           left:"45%"        ,
           transform:"translate(-50%,-50%)",
           width:"250px"
        }}
      >
        <ul style={{
          width:"100%",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between"
         }}> {""} {dots} {""} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={
          i==dotactive?
          {
          width: "30px",
         height:"30px",
         borderRadius:"50%",
         display:"flex",
         alignItems:"center",
         justifyContent:"center",
         color:"white",
         background:"#131921",
         padding:"8px 0",
         cursor:"pointer",
         border:"1px solid #f3a847"
        }:{
          width: "30px",
         height:"30px",
         borderRadius:"50%",
         display:"flex",
         alignItems:"center",
         justifyContent:"center",
         color:"white",
         background:"#232F3E",
         padding:"8px 0",
         cursor:"pointer",
         border:"1px solid white"
        }}
      >
        {i + 1}
      </div>
    ),
    responsive:[
      {
        breakpoint:576,
        settings:{
          dots:true,
          appendDots:(dots)=>(
            <div
            style={{
              position:"absolute",
              top:"70%",
              left:"0",
              right:"0",
              margin:"0 auto",
              transform:"translate(-50%,-50%)",
              width:"150px"

            }}
            >
            <ul style={{
              width:"100%",
             display:"flex",
             alignItems:"center",
             justifyContent:"space-between",
            }}>
             {dots }
            </ul>
            </div>
          )
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={bannerimg1}  alt="img1"/>
      </div>
      <div>
        <img src={bannerimg2}  alt="img1"/>
      </div>
      <div>
        <img src={bannerimg3}  alt="img1"/>
      </div>
      <div>
        <img src={bannerimg4}  alt="img1"/>
      </div>
      <div>
        <img src={bannerimg5}  alt="img1"/>
      </div>
      
    </Slider>
  );
}

export default Banner
