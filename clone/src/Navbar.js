import React, { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

  var lastScrollTop = 0;
 



 const[clas,setclas]=useState("visibl");

 useEffect(() => {
  // Define a function to toggle the visibility of the navcontainer element
  const toggleNav = () => {
    const nav = document.querySelector("navcontainer");
    // Get the current scroll position
    const currentScrollTop = window.scrollY;
    // Compare it with the previous scroll position
    if (currentScrollTop > lastScrollTop && currentScrollTop - lastScrollTop >= 188) {
      // If scrolling down and the difference is greater than 188, hide the navcontainer
      lastScrollTop = currentScrollTop;
      setclas("invisibl");
    } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 48) {
      // If scrolling up or at the top of the page, show the navcontainer
      lastScrollTop = currentScrollTop;
      setclas("visibl");
    }
  };

  // Add a scroll event listener to call the toggleNav function
  window.addEventListener("scroll", toggleNav);
  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener("scroll", toggleNav);
  };
}, [window.scrollY]);



  
  return (
    <div  className={`navcontainer ${clas}`}>
      <div className="rightnav">
<NavLink className='title list_n' to="/"><span >TMDB</span></NavLink>
<div className="list">movies</div>
<div className="list">TV shows</div>
<div className="list">People</div>
      </div>
    <div className="leftnav">
    <label className='lab' htmlFor="see">
    </label>
    <NavLink className='list_s'  id="see" to="/searchpage"><span >search</span></NavLink>

    
    </div>
    </div>
  )
}

export default Navbar
