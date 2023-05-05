import React, { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
// import { VscSearch } from "react-icons/vsc";

const Navbar = () => {

  var lastScrollTop = 0;
  // var currentScrollTop = window.scrollY;
 



 const[clas,setclas]=useState("visibl");

  useEffect(()=>{

    const updown = ()=>{
 

      
      const nav = document.querySelector("navcontainer")
      var currentScrollTop = window.scrollY; 
      if (currentScrollTop > lastScrollTop&&currentScrollTop-lastScrollTop>=188) {
        lastScrollTop = currentScrollTop;
       setclas("invisibl");
      }
      if (currentScrollTop < lastScrollTop || currentScrollTop<=48) {
        lastScrollTop = currentScrollTop;
        setclas("visibl");
      }
     
     
    
  }

    window.addEventListener("scroll", updown );
    return()=>{
    window.removeEventListener("scroll",updown);
    }
  },[window.scrollY])

  
  return (
    <div  className={`navcontainer ${clas}`}>
      <div className="rightnav">
<NavLink className='title list' to="/"><li >TMDB</li></NavLink>
<div className="list">movies</div>
<div className="list">TV shows</div>
<div className="list">People</div>
      </div>
    <div className="leftnav">
    <label className='lab' htmlFor="see">
    {/* <VscSearch/> */}
    </label>
    <NavLink className='list'  id="see" to="/searchpage"><li >search</li></NavLink>

    
    </div>
    </div>
  )
}

export default Navbar
