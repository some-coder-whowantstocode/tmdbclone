import {React,useEffect,useState} from 'react'
import './trailer.css'
import ReactPlayer from 'react-player'

const Trailer = ({needed}) => {
    const[visibility,setvisibility]=useState("invisible_trailer")
    const[videoscreen,setvideoscreen]=useState("videoscreen")
    const[key,setkey]=useState();
    const[time,settime]=useState();
    


    const show =()=>{

     
      setvisibility("visible_trailer");
         settime(true)
           
    }

    const hide =()=>{
      setvisibility("invisible_trailer");
      settime(false)
    }

    useEffect(()=>{
        const find = async () => {
            try {
              if (!needed.videos) {
                console.log(`wait for trailer`);
              } else {
                const url = needed.videos?.results.find(({ name }) => name === "Official Trailer") ?? null;
                console.log(url);
                setkey(url ? url.key : needed.videos.results[needed.videos.results.length - 1].key);
              }
            } catch (error) {
              console.log(error);
            }
          };
          find();
    //   console.log(needed)
    },[needed])


  return (
    <>
      <div className='playbtn' onClick={show}>▷ play trailer</div>

      <div className={visibility} >
        <div className={videoscreen}>
            <div className="cross" onClick={hide}>❌</div>
   
 <ReactPlayer url={`https://www.youtube.com/watch?v=${key}`} 
 config={{
  youtube: {
    playerVars: { showinfo: 1 }
  },
}}

width='80%'
height='80%'
controls
playing={time}
/>
       
        </div>
        
      </div>
    </>
  )
}

export default Trailer
