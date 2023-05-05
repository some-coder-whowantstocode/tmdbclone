import React, { useEffect,useState } from 'react'
import './tv.css'
import { useLocation} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import Progress from './Progress';
import Facts from './Facts';
import Credits from './Credits';
import Reviews from './Reviews';
import Trailer from './Trailer';
import Season from './Season';


const Tv = ({key}) => {
    const[data,setdata]=useState([]);
    const location = useLocation();
    const[tv,settv]=useState([]);

    const tvurl = `http://api.themoviedb.org/3/tv/${data}?api_key=2edbada9d611ecca8a2420c593d0659b&append_to_response=credits,reviews,videos&include_video_language=en,pt,fr,hi,keywords  `;

   
    useEffect(()=>{
        setdata(location.state)
        console.log(location)
    },[location])

    useEffect(()=>{
        // 
         const get=async()=>{
           const gd =await axios.get(tvurl);
        //    console.log(gd);
           settv(gd.data);



           
        } 
        get();
    },[data])

  return (
    <>
      <Navbar/>

      <div
        className="inf"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(${
              tv.backdrop_path
              ? "https://image.tmdb.org/t/p/w1280" + tv.backdrop_path
              : tv.poster_path
          }) `
         
        }}
      >
        <div className="inflight">
          <div className="rightinfo">
            <img
              className="infimg"
              src={
                tv.poster_path
                  ? "https://image.tmdb.org/t/p/w342" + tv.poster_path
                  : tv.backdrop_path 
              }
            ></img>
          </div>

          <div className="leftinfo">
            <h1>{tv.name ? tv.name : tv.original_name}</h1>
            <div className="detaill">
            <p>{tv.release_date}</p>
            <ul>
            <li></li>
            </ul>
            
            <div className="geners">
              {tv.genres&&tv.genres.map((genre)=>(
                <p>{genre.name}</p>
              ))}
            </div>
           
           
           
            </div>
          
            <div className="infpro">
              <Progress display={"relative"} rating={tv.vote_average} siz={1.4} />
              <Trailer needed={tv}/>
            </div>
            <p>{tv.tagline}</p>
            <h4>Overview</h4>
            <p>{tv.overview}</p>
          </div>
        </div>
      </div>


<div className="inFo">
<div className="left_info">
<Credits movi={data}  mov={tv} type={"tv"}/>
<hr className="infohr"/>

<div className="season">
    <Season movi={data} mov={tv}/>
</div>

<hr className='infohr' />
<Reviews rev={tv} type={"tv"}/>


</div>

<div className="right_info">
<Facts fact={tv}/>
</div>

</div>

   
    </>
  )
}

export default Tv
