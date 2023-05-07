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
        <h2> Cast <div className="acn">{movie.credits&& movie.credits.cast.length}</div></h2>
        {
            
            movie.credits && movie.credits.cast.map((memb)=>(
                <div className="memb_box_wholecrew" key={memb.credit_id}>
                  <NavLink to='/profile' state={memb.id}>
                  <img className="castmem_wholecrew" key={memb.credit_id} src={memb.profile_path ? "https://image.tmdb.org/t/p/w185"+memb.profile_path : profile} alt="" />
                  </NavLink>
                <div className="name_detail">
                <NavLink to='/profile' state={memb.id} className="original_name_wholecrew">{memb.original_name}</NavLink>
                <div className="charname_wholecrew" key={memb.credit_id}>{memb.character}</div>
                </div>
               
                </div>
            ))
        }
      </div>

      <div className="allcast">
      <h2>Crew <div className="acn">{movie.credits&& movie.credits.crew.length}</div></h2>
        {
            
            movie.credits && movie.credits.crew.map((memb)=>(
                <div className="memb_box_wholecrew" key={memb.credit_id}>
                  <NavLink to="/profile" state={memb.id}>
                  <img className="castmem_wholecrew" key={memb.credit_id} src={memb.profile_path ? "https://image.tmdb.org/t/p/w185"+memb.profile_path : profile} alt="" />
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
