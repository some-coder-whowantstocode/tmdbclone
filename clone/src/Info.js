import React, { useState, useEffect } from "react";
import { useLocation, Link,NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Progress from "./Progress";
import "./info.css";
import Credits from "./Credits";
import Reviews from "./Reviews";
import Trailer from "./Trailer";
import Facts from "./Facts";
import Requests from './Requests';

const Info = ({ rat }) => {

  


  const location = useLocation();

  const [data, setdata] = useState([]);
  const [movid, setmovid] = useState();
  const [movie, setmovie] = useState([]);
  

  useEffect(() => {
    location.state != undefined && setdata(location.state);
    
  }, [location]);

  useEffect(() => {
    setmovid(data);
}
  , [data]);

  //console.log(movid);



  useEffect(() => {
   
      try {
        // Check if movid is defined
        if (!movid || movid == "") {
          // console.log("wait a little");
        } else {
          const moviedata = async () => {
            const id = movid;
           
              const movieurl =  `http://api.themoviedb.org/3/movie/${id.toString()}?api_key=${Requests.apikey}&append_to_response=credits,reviews,videos&include_video_language=en,pt,fr,hi`;
          // Use destructuring to get data from axios response
          let { data } = await axios.get(movieurl);
          // Use logical AND to set movie only if data is not undefined
          data && setmovie(data);
          
        }
        moviedata();
      };
     
      } catch (error) {
        // Use optional chaining to access error property safely
        console.log(error.response?.data?.error);

        throw error;
      }
  
  }, [movid]);


  return (
    <div>
      <Navbar />

      <div
        className="inf"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(${
              movie.backdrop_path
              ? "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path
              : movie.poster_path
          }) `
         
        }}
      >
        <div className="inflight">
          <div className="rightinfo">
            <img
              className="infimg"
              src={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/w342" + movie.poster_path
                  : movie.backdrop_path 
              }
            ></img>
          </div>

          <div className="leftinfo">
            <h1>{movie.title ? movie.title : movie.original_title}</h1>
            <div className="detaill">
            <p>{movie.release_date}</p>
            <ul>
            <li></li>
            </ul>
            
            <div className="geners">
              {movie.genres&&movie.genres.map((genre)=>(
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <ul>
            <li></li>
            </ul>
           
            <p>{Math.floor((movie.runtime)/60) + "h" + " " + movie.runtime%60 + "m"}</p>
            </div>
          
            <div className="infpro">
              <Progress display={"relative"} rating={movie.vote_average} siz={1.4} />
              <Trailer needed={movie}/>
            </div>
            <p>{movie.tagline}</p>
            <h4>Overview</h4>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>


<div className="inFo">
<div className="left_info">
<Credits movi={data}  mov={movie} type={"movie"}/>
<hr className="infohr"/>
<Reviews rev={movie} type={"movie"}/>
</div>

<div className="right_info">
<Facts fact={movie}/>
</div>

</div>

    </div>
  );
};

export default Info;
