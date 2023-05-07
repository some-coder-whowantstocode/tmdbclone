import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Requests from './Requests';
import axios from 'axios';
import Headline from './Headline';
import Image from './inf.png';
import './episode.css'
import Navbar from './Navbar';

const Episode = () => {

    const location = useLocation();
    const [ie,setie]=useState();
    const[data,setdata]=useState();
    const [ep,setep]=useState([]);
    const[no,setno]=useState()

    useEffect(()=>{
        // console.log(location.state["0"])
        // let a = location.state
        // console.log(a)
        let a = location.state["0"];
        // setid(a)
        let b = location.state["1"]
        setno(b.toString())
        // console.log(b.toString())
        setie(a)
       
        // setid(location.state[0] != undefined && location.state[0])
        // setdata(location.state)
    },[location])

  
    useEffect(()=>{
        data!=undefined && console.log(data)
    },[data])

   
    // https://api.themoviedb.org/3/tv/123?api_key=key&append_to_response=season/1,season/2,season/3,season/4,season/5,season/6
    useEffect(()=>{
        try {
            if(ie == undefined || ie == ""){
                // console.log(id)
            }else if(ie != undefined){
    const url =  ` https://api.themoviedb.org/3/tv/${ie}?api_key=${Requests.apikey}&append_to_response=season/${no}} `
                const get=async()=>{
                    const gd = await axios.get(url)
                    // console.log(gd.data[`season/${no}}`])
                    setdata( gd.data[`season/${no}}`])
                    // console.log(`season/${no}`)
                    setep(gd.data)
                }
                get()
                // console.log(no)
            }
        }catch(error){
           console.log(error.response?.gd?.data)     
        }
        // console.log(id)
    },[ie])
    
  return (
    <div>
        <Navbar/>
      <Headline mov={ep != undefined && ep}/>

      <div className="eps">
       
        {data != undefined && data.episodes.length >0 ?
        <div>
         <h3 className="no_ep">Episodes <div>{ep && ep.number_of_episodes}</div></h3>
           { data != undefined && data.episodes!= undefined &&  data.episodes.map((epi)=>(
                <div className='ep_box' key={epi.id}>
                    <div className="leb">
                    <img className='ep_img' src={epi != undefined && epi.still_path
                  ? "https://image.tmdb.org/t/p/w342" + epi.still_path
                  : Image }/>
                    </div>
               <div className="reb">
                <div className='ep_title'>{epi != undefined &&epi.name}</div>
                <div>{epi != undefined &&epi.overview ? epi.overview : "no overview available"}</div>
               </div>
                </div>

            ))}
            </div>
                    
            :
            <div>Currently no episodes available.</div>
        }
      </div>
    </div>
  )
}

export default Episode
