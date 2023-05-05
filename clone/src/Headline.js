import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './headline.css'

const Headline = ({movi,mov,type}) => {
  const[movii,setmovii]=useState([]);

useEffect(()=>{
    mov != undefined && setmovii(mov)
},[mov])


useEffect(()=>{
    console.log(movii)
},[movii])

const check =(tipe)=>{
    switch(tipe){
        case 0 : return  <div className='colflex'> <NavLink className="title_wholecrew back_wc" state={movii.id}  to="/tv">{movii != undefined && movii.name ? movii.name ?movii.name :movii.original_name : (movii.title ? movii.title : movii.original_title) }</NavLink>
        <NavLink className="back_wc" state={movii.id}  to="/tv">←Back to main</NavLink>
        </div>

        case 1 : return <div className='colflex'>  <NavLink className="title_wholecrew back_wc" state={movii.id}  to="/info">{movii != undefined && movii.name ? (movii.name ?movii.name :movii.original_name ) : (movii.title ? movii.title : movii.original_title) }</NavLink>
        <NavLink className="back_wc" state={movii.id}  to="/info">←Back to main</NavLink></div>

        default : return <div className='colflex'>  <NavLink className="title_wholecrew back_wc" state={movii.id}  to="/info">{movii != undefined && movii.name ? (movii.name ?movii.name :movii.original_name ) : (movii.title ? movii.title : movii.original_title) }</NavLink>
        <NavLink className="back_wc" state={movii.id}  to="/info">←Back to main</NavLink></div>
    }
}

  return (
    <>
        <div className="head_wholecrew">
        <div className="h_wleft">
        <img  className="headline_wholecrew" src={movii !=undefined &&  movii.poster_path ? "https://image.tmdb.org/t/p/original"+ movii.poster_path : "https://image.tmdb.org/t/p/original" + movii.backdrop_path} alt="" />
        </div>
        <div className="h_wright">

{check(movii != undefined && movii.name ?  0 : 1)}

      
        </div>
      
        </div>
    </>
  )
}

export default Headline
