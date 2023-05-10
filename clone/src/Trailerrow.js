import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
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
      try {
        if(!id){
          // console.log("no id available in trailerrow")
        }
        else{
          const moviedata = async () => {
       
            const movieurl = `http://api.themoviedb.org/3/movie/${id!=undefined &&id}?api_key=2edbada9d611ecca8a2420c593d0659b&append_to_response=credits,reviews,videos&include_video_language=en,pt,fr,hi,keywords`;
            const od = await axios.get(movieurl);
            setmovie(od.data);
         
        };
        moviedata();
        }
    
    } catch (error) {
      console.error(error);
    }
      }, [id]);


      useEffect(()=>{
        // console.log(key != undefined && key)
      },[key])

      useEffect(()=>{
        try {
          if(!movie){
            console.log("no movie in trailerow")
          }
          else{
            const find = async (movie = {}) => {
      
              const { videos = {} } = movie;
              const { results = [] } = videos;
              let url ={};
              for(let result of results){
                let res = await result;
                if(res.name === "Official Trailer"){
                  url = res;
                  break;
                }
              }
              !url ? console.log("no url in trailerrow") :
              setkey(url ? url.key : results[results.length - 1].key);
          };
          find(movie);
          }
   
    } catch (error) {
      console.log(error.response?.url?.response );
    }
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



const ref = useRef(null);

const scroll = (scrollOffset) => {
  ref.current.scrollLeft += scrollOffset;
};



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
       

       <div className="shadowbox" ref={ref}>
       <button onClick={()=>scroll(500)} className="right rb">⇾</button>
      <button onClick={()=>scroll(-500)} className="left rb">←</button>
<h2 className='titl_tr' >{title}</h2>
       
    
      {data != undefined && data.results && data.results.map((res)=>(
      <div  className='trailer_rbox' key={res.id + 9450539}>
        <div onClick={()=>settle(res.id)}  className="trailer_r" onMouseEnter={()=>setimg(res.backdrop_path)} style={{
            backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(${
              res.backdrop_path
              ? "https://image.tmdb.org/t/p/w1280" + res.backdrop_path 
              : res.poster_path
          }) `
         
        }}>
            <div className='pb'  >▷</div>
        </div>
        <p key={res.id } >{res.title}</p>
        
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
