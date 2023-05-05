import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import Navbar from "./Navbar";
import './wholereview.css';
import profile from './profile.png'
import Headline from "./Headline";


const Wholereview = () => {


    const[movie,setmovie]=useState();
    const location = useLocation();
    const[tipe,settipe]=useState()

    useEffect(()=>{
        setmovie(location.state)
        // settipe(location.state.type)
    },[location])

    useEffect(()=>{
        // console.log(movie)
    },[movie])

  return (
    <>
      <Navbar/>
      <Headline mov={movie != undefined && movie} />

      <div className="wholereview">
        {movie !=undefined &&  movie.reviews.results.length!=0 && movie.reviews.results.map((rev)=>(
            <div key={rev.id} className="wholerevbox">
                <div className="left_wr">
               
            
                <img className="reviwer" src={ rev.author_details.avatar_path ? ( rev.author_details.avatar_path.length>35 ? "https://secure.gravatar.com/avatar"+  rev.author_details.avatar_path.substr(35)   +"?s=64"  :"https://secure.gravatar.com/avatar"+  rev.author_details.avatar_path   +"?s=64" )   : profile} alt="" />
                </div>
                <div className="right_wr">
                    <div className="top_wr">
                        <div>
                        <h3 className="author">{"Review by "+rev.author}</h3>
                        <h5 className="date_review">{rev.updated_at ?"Updated at" +" " + rev.updated_at.substr(0,10) + " "+ "by" +" " + rev.author  : "Created at" +" "+ rev.created_at.substr(0,10) +" "+ "by"+ " " + rev.author}</h5>
                        </div>
                    <div >
            {movie.reviews && (rev.author_details.rating != undefined && <div className="rating_review" >{ "⭐"+" "+ rev.author_details.rating} </div>)}
          </div>
          {/* "⭐"+" "+ rev.author_details.rating  */}
                    </div>
                    <div className="bottom_wr">
                    <p className="review">{(rev &&rev.content+".....")}<a className="full_review" href={rev && (rev &&  rev.url)}
>read the rest.</a></p>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </>
  )
}

export default Wholereview
