import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { NavLink, useLocation } from 'react-router-dom'
import Headline from './Headline'
import axios from 'axios'
import './wholeseason.css'
import Image from './inf.png'
import Requests from './Requests';

const Wholeseason = () => {
    const[tvid,settvid] = useState()
    const location = useLocation();
    const[tv,settv]=useState([]);

    useEffect(()=>{
        settvid(location.state)
        console.log(location.state)
    },[location])

    useEffect(()=>{
      console.log(tv)
    },[tv])

    const tvurl = `http://api.themoviedb.org/3/tv/${tvid}?api_key=${Requests.apikey}&append_to_response=credits,reviews,videos&include_video_language=en,pt,fr,hi,keywords  `;

   
   

    useEffect(()=>{
        try{
          if(!tv){
            console.log("not available");
          }
          else{
            const get=async()=>{
              const gd =await axios.get(tvurl);
              console.log(gd.data.seasons);
              settv(gd.data) 
           } 
           get();
          }
        }catch(error){
          console.log(error.response?.gd?.error)
        }
        
    },[tvid])

  return (
    <>
      <Navbar/>
      <Headline mov={tv!= undefined && tv}/>

<div className="sealist">



{tv != undefined &&tv.seasons!=undefined &&  tv.seasons.map((sea)=>(
  <div className="sea">
  <div className="cs">
  <div className="leftcs">
    <NavLink to="/episode" state={[tvid && tvid , sea.name.substr(7,1)]} >
    <img className='image_sea' src={ (sea != undefined && sea.poster_path == undefined ? Image:"https://image.tmdb.org/t/p/w185"+ sea.poster_path )} alt="" />
    </NavLink>
  </div>
  <div className="rightcs">
      <div>

    
      <h3 className='name_season'>{
      sea != undefined &&sea.name
      // console.log(sea != undefined && sea.poster_path)
      }</h3>
      <div className="infocs">
          <div className="leftifc">
              {(sea != undefined && sea.air_date.substr(0,4))}
          </div>
          <div className="rightifc">
              <div className="rightifctop">
              {(sea != undefined && sea.episode_count)+" "}Episodes
              </div>
              <div>{sea!=undefined && sea.overview}</div>
          </div>
      </div>
      </div>

      <div className="bottom_seasons">
                  {sea != undefined && sea.overview}
              </div>

  </div>
</div>
</div>

))}

</div>

    </>
  )
}

export default Wholeseason
