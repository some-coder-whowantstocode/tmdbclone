
import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import "./credits.css";
import profile from './profile.png'


const Credits = ({movi,mov,type}) => {

    const [movie, setmovie] = useState([]);
    const[list,setlist]=useState([]);
    const[tipe,settipe]=useState();

    useEffect(() => {
      

        setmovie(mov)
        setlist([]);
      }, [mov]);

      useEffect(()=>{
        movie.credits && movie.credits.cast.map((cas)=>(
         
             cas.order < 9 && setlist((prev)=>([...prev, cas ])) 
            
        ))

        
      },[movie])

      useEffect(()=>{
        
        settipe(type)
      },[type])

  return (
    <>
      <div className="credits">
<h3>Top Billed Cast</h3>

<div className="cast">
 
  {list.length >=1&&list.map((mem)=>(
    
      <div className="imgdetinfo" key={mem.id}>
        <NavLink to="/profile" state={mem.id} >
      <img className="castmem " id={mem.credit_id} src={mem.profile_path ? "https://image.tmdb.org/t/p/w185"+mem.profile_path : profile}></img>
        </NavLink>
      <div className="name_info ">
        <div className="oribox">
        <NavLink to="/profile" state={mem.id}  className="original_nameinfo">{mem.original_name}</NavLink>

        <p className="charname">{mem.character}</p>
    
        </div>
       
    
          
      </div>
      
          </div>
    
))}
{
list !=undefined && movie.credits && movie.credits.cast.length>9 && <div className="loadmore_container"><NavLink className="loadmore_credits"   to="/wholecrew" state={{movi,mov}}><span >view more ⇾ </span></NavLink></div> 
}




</div>

<NavLink className='wholecrew'   to="/wholecrew"  state={{movi,mov,type}}>Full Cast & Crew</NavLink>

</div>


    </>
  )
}

export default Credits
