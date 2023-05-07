import React, { useEffect, useState } from 'react'
import './profile.css'
import Navbar from './Navbar'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import image from './profile.png'
import imag from "./inf.png";
import Carrer from './Carrer'
import Requests from './Requests';

const Profile = ({Key}) => {
    const location = useLocation();
    const[pi,setpi]=useState();
    const[data,setdata]=useState();
    const[list,setlist]=useState([]);
    const[unlist,setunlist]=useState([]);
    const[journal,setjournal]=useState("movie");
    const[mc,setmc]=useState("active");
    const[mcr,setmcr]=useState("");
    const[tc,settc]=useState("");
    const[tcr,settcr]=useState("");

    const url =  `https://api.themoviedb.org/3/person/${pi}?api_key=${Requests.apikey}&append_to_response=movie_credits,tv_credits`
   
    useEffect(()=>{
        // console.log(location.state)
        setpi(location.state)
    },[location])

    useEffect(()=>{
      try {
        if(!pi || pi==""){

        }else{
          const find = async () => {
           
            const data = await axios.get(url);
            // console.log(data);
            setdata(data.data);
            setlist([]);
            setunlist([]);
         
        };
        find();
        }
        
        } catch (error) {
          console.error(error);
          // do something else with the error
        }

    },[pi])

useEffect(()=>{
  const know =()=>{
    data !=undefined && data.movie_credits.cast.length>0 ?
    setunlist(data != undefined &&data.movie_credits.cast):setunlist(data != undefined &&data.tv_credits.cast)
  }
  know()
},[data])
   
useEffect(()=>{
  // console.log(unlist)
  // let len =0;
  // unlist.slice(0,9)
  unlist.length >0  && unlist.map((cas)=>(
         
    unlist.indexOf(cas)<9 && setlist((prev)=>([...prev, cas ])) 
   
))


},[unlist])

// console.log(list)

    const chanmovie =(given)=>{
        //  given == "movie" ? setmc("active") 
        switch(given){
          case "movie" : return setmc("active"),settc(""),setmcr(""),settcr(""),setjournal(given)

          case "tv" : return setmc(""),settc("active"),setmcr(""),settcr(""),setjournal(given)

          case "moviecrew" : return setmc(""),settc(""),setmcr("active"),settcr(""),setjournal(given)

          case "tvcrew" : return setmc(""),settc(""),setmcr(""),settcr("active"),setjournal(given)

          default : return setmc("active"),settc(""),setmcr(""),settcr(""),setjournal(given)
        }
    }

  return (
    <>
      <Navbar/>
      <div className="profile">
        <div className="left_profile">
            <img className='act' src={data != undefined && data.profile_path ? "https://image.tmdb.org/t/p/original"+data.profile_path : image} alt="" />
            <div className="lpa">

            
            <h5>Personal info</h5>
            <div className="knownfor">
              <h6>Known for</h6>
              <p>{data != undefined &&data.known_for_department}</p>
            </div>
            <div className="birthday">
              <h6>Birth Day</h6>
              <p>{data != undefined &&data.birthday}</p>
            </div>
            <div className="birthplace">
              <h6>Birth place</h6>
              <p>{data != undefined &&data.place_of_birth}</p>
            </div>
            <div className="also">
            <h6>Also known as</h6>
              {
                data != undefined && data.also_known_as.map((chan)=>(
                  <div key={chan.id}>
                    
                  <div >{chan}</div>
                  </div>
                ))
              }
            </div>
            </div>
        </div>
        <div className="right_profile">
            <h1 className='actname'>{data != undefined && data.name}</h1>
            <div className="biography">
              <h3>Biography</h3>
              <p>{data != undefined &&data.biography}</p>
            </div>
            <div className="known">
              <h2>Known for</h2>
              <div className="knownlist">
              {
  list.length >0  && list.map((cas)=>(
    <div className="ke" >
 <NavLink to="/info" state={cas.id} >
      <img className='actimg' src={cas.poster_path ?(cas.poster_path?"https://image.tmdb.org/t/p/w185"+cas.poster_path: imag) :(cas.backdrop_path ? "https://image.tmdb.org/t/p/w185"+cas.backdrop_path : imag)   }/>
    </NavLink>
    </div>
   
  ))
}
              </div>

            </div >
            <h4 className='journal'>Journal</h4>
            <div className="choose_pro">
            <p className={mc} onClick={()=>chanmovie("movie")}>movie cast</p> 
            <p className={tc} onClick={()=>chanmovie("tv")}>tv cast</p>
            <p className={mcr} onClick={()=>chanmovie("moviecrew")}>movie crew </p>
            <p className={tcr} onClick={()=>chanmovie("tvcrew")}>tv crew</p>
            </div>
            
            {
           <Carrer ke={data != undefined && data} type={journal}/> 
        }
        </div>
       
      </div>
    </>
  )
}

export default Profile
