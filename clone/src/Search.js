import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import Request from './Requests.js'
import './search.css'

const Search = () => {
    const[elem,setelem]=useState("");
    const[url,seturl]=useState();
    const[back,setback]=useState();

    const inputelem = useRef("");


    const reg =(e)=>{
        setelem(e.target.value)
    }
// useEffect(()=>{
//   seturl(Request.popularmovies)

// },[Request.popularmovies])



//     useEffect(()=>{
//       try{
//         // if(!url){
//         //   console.log("stop")
//         // }else{
//           const get=async()=>{
//             const {objdata} = await axios.get(url);
//             objdata != undefined  && console.log(objdata)
//           }
//           get()
//         // }
//       }
//       catch(error){
//         console.log(error.response?.objdata?.error);
//       }
    
//     },[url])

  return (
    <div className='searchspace'>
      <div className="searchbackbox">
      <div className='searchbox'>
      <div className="des">
        <h2>Welcome</h2>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
      </div>
      <div className='searchbar'>
      <input className='search' type='text' placeholder='Search for a movie,tv show,person......' onChange={reg}  ref={inputelem}/>

<NavLink to='/searchpage' className='searchbtn' state={elem} ><button  className='searchbtn' >Search</button></NavLink>
      </div>
    
      
     

    </div>
      </div>
   
    </div>
 
  )
}

export default Search
