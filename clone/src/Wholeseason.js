import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import Headline from './Headline'

const Wholeseason = () => {
    const[tvid,settvid] = useState()
    const location = useLocation();

    useEffect(()=>{
        settvid(location.state)
        console.log(location.state)
    },[location])
  return (
    <>
      <Navbar/>
      <Headline movi={tvid!= undefined && tvid}/>
    </>
  )
}

export default Wholeseason
