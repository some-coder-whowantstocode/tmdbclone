import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import image from'./inf.png'
import './Row.css'
import Progress from './Progress'

const Row = ({url,title}) => {

    const[movies,setmovies]=useState([]);

    useEffect(()=>{
        const getdata  = async()=>{
            const objdata = await axios.get(url);
           
            setmovies(objdata)
           
        }
        getdata();
        
    },[url])


    const mov =(result)=>{


 return  <div className='rowimagecontainer' key={result.id + "0"}>
               <NavLink className='name' state={result.id} key={result.id + "1"}  to="/info">
   <img className='rowimg' key={result.id + "2"} src={result.poster_path ? "https://image.tmdb.org/t/p/w154"+result.poster_path : image} alt="movie"></img>
   <p className='name' key={result.id + "3"}>{result.title ? result.title : result.original_title}</p>
   </NavLink>
   <div className="progressbar" key={result.id + "4"}>
   <Progress rating={result.vote_average}/>
   </div>
   <p className='date' key={result.id + " 5"}>{result.release_date ? result.release_date : result.first_air_date}</p>
               </div>

    }


    const tv =(result)=>{
      return  <div className='rowimagecontainer' key={result.id + "6"}>
      <NavLink className='name' state={result.id} key={result.id + "7"}  to="/tv">

      
    <img className='rowimg' key={result.id + "8"} src={result.poster_path ? "https://image.tmdb.org/t/p/w154"+result.poster_path : image} alt='tv series'></img>
    <p className='name' key={result.id + "9"}>{result.name ? result.name : result.original_name}</p>
    </NavLink>
    <div className="progressbar" key={result.id + "10"}>
    <Progress rating={result.vote_average}/>
    </div>
    <p className='date' key={result.id + "11"}>{result.release_date ? result.release_date : result.first_air_date}</p>
      </div>
    }

  return (
    <div className='rowcontainer'>
    <div className="titlecontainer">
    <div className="rowtitle" ><h2 className="rowtitle">{title}</h2></div>
    </div>
    
      <div className="rowbox"  >
        
        {movies.data&&movies.data.results.map((result)=>(
          result.media_type ? result.media_type=="movie" ? mov(result) : tv(result) : mov(result)
        ))}
        </div>
       
    </div>
  )
}

export default Row
