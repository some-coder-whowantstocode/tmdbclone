import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Specific = () => {
    const location = useLocation();

    useEffect(()=>{
        console.log(location.state)
    },[location])
  return (
    <div>
      
    </div>
  )
}

export default Specific
