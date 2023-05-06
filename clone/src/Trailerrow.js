import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './trailerrow.css'
import ReactPlayer from 'react-player'
import Void from './void.jpg'

const Trailerrow = ({url,title}) => {

    const[data,setdata]=useState([])
    const[img,setimg]=useState()
    const[id,setid]=useState()
    const[needed,setneeded]=useState([])
    const[key,setkey]=useState()
    const[time,settime]=useState();
const[visibility,setvisibility]=useState("invisibl_trailer")
const[videoscreen,setvideoscreen]=useState("videoscren")
const[movie,setmovie]=useState([]);


    useEffect(()=>{
        const getdata =async()=>{
            const od = await axios.get(url)
            setdata(od.data)
        }
        getdata()
    },[url])

    // console.log(data);

    useEffect(() => {
      const moviedata = async () => {
        try {
          const movieurl = `http://api.themoviedb.org/3/movie/${id!=undefined &&id}?api_key=2edbada9d611ecca8a2420c593d0659b&append_to_response=credits,reviews,videos&include_video_language=en,pt,fr,hi,keywords`;
          const od = await axios.get(movieurl);
          setmovie(od.data);
        } catch (error) {
          console.error(error);
        }
      };
      moviedata();
      }, [id]);


      useEffect(()=>{
        // console.log(key != undefined && key)
      },[key])

      useEffect(()=>{
    
      const find = async (movie = {}) => {
        try {
          const { videos = {} } = movie;
          const { results = [] } = videos;
          const url = await results.find(({ name }) => name === "Official Trailer");
          // console.log(url);
          // const {key } = url ? url.key : results[results.length - 1].key;
          setkey(url ? url.key : results[results.length - 1].key);
        } catch (error) {
          console.error(error);
        }
      };
      find(movie);
     

      // console.log(movie)
    },[movie])
    

const show =()=>{

     
    setvisibility("visibl_trailer");
       settime(true)
         
  }

  const hide =()=>{
    setvisibility("invisibl_trailer");
    settime(false)
  }


const settle =(id)=>{
    show()
    setid(id)
}

  return (
    <>
    <div className="trailrowbox">
<div className="trailbox">


  
    
    <div className="trailerrow" style={{
            backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(${
              img!=undefined? "https://image.tmdb.org/t/p/w1280" + img : Void
              
          }) `
         
        }}>
       

       <div className="shadowbox">
<h2 className='titl_tr' >{title}</h2>
       
    
      {data != undefined && data.results && data.results.map((res)=>(
      <div  className='trailer_rbox' key={res.id}>
        <div onClick={()=>settle(res.id)} className="trailer_r" onMouseEnter={()=>setimg(res.backdrop_path)} style={{
            backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(${
              res.backdrop_path
              ? "https://image.tmdb.org/t/p/w1280" + res.backdrop_path 
              : res.poster_path
          }) `
         
        }}>
            <div className='pb'>▷</div>
        </div>
        <p>{res.title}</p>
        
        </div>
      ))}
      </div>

</div>
</div>
</div>
<div className={visibility} >
        <div className={videoscreen}>
            <div className="cross" onClick={hide}>❌</div>
   
 <ReactPlayer url={`https://www.youtube.com/watch?v=${key}`} 
 config={{
  youtube: {
    playerVars: { showinfo: 1 }
  },
}}

width='100%'
height='100%'
controls
playing={time}
/>
       
        </div>
        
      </div>
    </>
  )
}

export default Trailerrow
