import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import './carrer.css'

const Carrer = ({ke,type}) => {
    const[data,setdata]=useState();
    const[tipe,settipe]=useState();

    useEffect(()=>{
        ke != undefined && setdata(ke)
    },[ke])

    useEffect(()=>{
        // (console.log(data))
    },[data])

    useEffect(()=>{
       type != undefined && settipe(type)
    },[type])

    const mca =()=>{
       return data != undefined && data.movie_credits && data.movie_credits.cast.map((cas)=>(
            <div className='line_box_c' key={cas.credit_id}>
             {cas.release_date && cas.release_date.substr(0,4)} <ul> <li></li>  </ul> <NavLink className={"titl_care"} to="/info" state={cas.id}> {cas.title ? cas.title: cas.original_title} </NavLink>
              </div>
        ))
    }

    const mcr = ()=>{
        return data != undefined && data.movie_credits && data.movie_credits.crew.map((cas)=>(
            <div className='line_box_c' key={cas.credit_id}>
              {cas.release_date && cas.release_date.substr(0,4)} <ul> <li></li>  </ul> <NavLink to="/info" className={"titl_care"} state={cas.id}> {cas.title ? cas.title: cas.original_title} </NavLink>
              </div>
        ))
    }

    const tca = ()=>{
        return data != undefined && data.tv_credits && data.tv_credits.cast.map((cas)=>(
            <div className='line_box_c' key={cas.credit_id}>
              {cas.first_air_date && cas.first_air_date.substr(0,4)} <ul> <li></li>  </ul> <NavLink to="/info" className={"titl_care"} state={cas.id}> {cas.name ? cas.name: cas.original_name} </NavLink>
              </div>
        ))
    }

    const tcr = ()=>{
        return data != undefined && data.tv_credits && data.tv_credits.crew.map((cas)=>(
            <div className='line_box_c' key={cas.credit_id}>
                            {cas.first_air_date && cas.first_air_date.substr(0,4)} <ul> <li></li>  </ul> <NavLink to="/info" className={"titl_care"} state={cas.id}> {cas.name ? cas.name: cas.original_name} </NavLink>
              </div>
        ))
    }

    const choose = (type)=>{
        switch(type){
            case "movie" :   return mca()

            case "tv"  : return  tca()

            case "moviecrew" : return mcr()
            
            case "tvcrew" : return tcr()

            default : return mca()
        }
    }
  

  return (
    <>
      
      {/* <p onClick={click()}>tv</p> */}
      <div className="box_carrer">
        {
        choose(tipe)
        }
      </div>
    </>
  )
}

export default Carrer
