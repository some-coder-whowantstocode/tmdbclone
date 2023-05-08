import axios from 'axios';
import {React,useState,useEffect} from 'react'
import "./fact.css"
import Requests from './Requests';

const Facts = ({fact}) => {

  const[use,setuse]=useState();

  
  useEffect(()=>{
    setuse(fact);
    const find=async()=>{
      const url = `https://api.themoviedb.org/3/find/${fact.imdb_id}?api_key=${Requests.apikey}&external_source=imdb_id` ;
      const data = await axios.get(url)
    //   console.log(data);
    }
    find();

  },[fact])

  useEffect(()=>{
    // console.log(use)
  },[use])

  return (
    <>
      <div className="facts">
        <div className="status fs">
          <h3>Status</h3>
          <p>{use != undefined && use.status}</p>
          </div>
          <div className="Original_language fs">
            <h3>Original Language</h3>
            <p>{use != undefined && use.original_language}</p>
          </div>
          <div className="type fs">
            <h3>Type</h3>
            <p>{use != undefined && use.type  ? use.type : "--"}</p>
          </div>
          <div className="budget fs">
            <h3>Budget</h3>
            <p>${use != undefined && use.budget >0 ? use.budget : "--"}</p>
          </div>
          <div className="revenue fs">
            <h3>Revenue</h3>
            <p>${use != undefined && use.revenue >0 ? use.revenue : "--"}</p>
          </div>
      </div>
    </>
  )
}

export default Facts
