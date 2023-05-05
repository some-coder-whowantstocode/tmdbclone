import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import './wholecrew.css';
import profile from './profile.png'
import Headline from "./Headline";

const Wholecrew = () => {

    const location = useLocation();

    const [movie, setmovie] = useState([]);
    const[movii,setmovii] =useState();
    const[type,settipe] = useState();

    useEffect(()=>{
        setmovie(location.state.mov)
        // console.log(location.state.mov)
        setmovii(location.state.movi);
        settipe(location.state.type)
        // console.log(location.state.type)
       
    },[location])

   

      useEffect(()=>{
        movie.credits&& console.log(movie)
      },[movie])

  
      

  return (
    <>
      <Navbar/>
    <Headline movi={movii} mov={movie} type={type}/>
        
      <div className="member_wholecrew">

      
        
     
      <div className="allcrew">
        <h2>{movie.credits&&  "Cast" + movie.credits.cast.length}</h2>
        {
            
            movie.credits && movie.credits.cast.map((memb)=>(
                <div className="memb_box_wholecrew" key={memb.id +"12894759"}>
                  <NavLink to='/profile' state={memb.id}>
                  <img className="castmem_wholecrew" key={memb.id +"130943509"} src={memb.profile_path ? "https://image.tmdb.org/t/p/w185"+memb.profile_path : profile} alt="" />
                  </NavLink>
                <div className="name_detail">
                <NavLink to='/profile' state={memb.id} className="original_name_wholecrew">{memb.original_name}</NavLink>
                <div className="charname_wholecrew" key={memb.id +"145432905"}>{memb.character}</div>
                </div>
               
                </div>
            ))
        }
      </div>

      <div className="allcast">
      <h2>{movie.credits&&  "Crew" + movie.credits.crew.length}</h2>
        {
            
            movie.credits && movie.credits.crew.map((memb)=>(
                <div className="memb_box_wholecrew" key={memb.credit_id}>
                  <NavLink to="/profile" state={memb.id}>
                  <img className="castmem_wholecrew" key={memb.credit_id } src={memb.profile_path ? "https://image.tmdb.org/t/p/w185"+memb.profile_path : profile} alt="" />
                  </NavLink>
                <div className="name_detail">
                <NavLink to='/profile' state={memb.id} className="original_name_wholecrew">{memb.original_name}</NavLink>
                <div className="charname_wholecrew" key={memb.credit_id}>{memb.department}</div>
                </div>
               
                </div>
            ))
        }
      </div>
      </div>
    </>
  )
}

export default Wholecrew
