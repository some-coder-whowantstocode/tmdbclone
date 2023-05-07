import React, { useState, useEffect } from "react";
import { useLocation, Link,NavLink } from "react-router-dom";
import './review.css';


const Reviews = ({rev,type}) => {

    const [movie, setmovie] = useState([]);


    useEffect(() => {
        setmovie(rev)
      }, [rev]);

   
  return (
    <>
      <div className="review">
        <div className="r">
        <h3 className="heading">social</h3>
  <h3 className="revres active_review">reviews<span className="revre">{movie.reviews && movie.reviews.total_results}</span></h3>
        </div>

  {movie.reviews && movie.reviews.results.length>0 ?  <div className="revbox">
      <div className="headrev_review">
        <div className="lefthead_review">
        <img className="reviwer" src={movie.reviews && (movie.reviews.results.length>0 && "https://secure.gravatar.com/avatar"+ (movie.reviews.results[0].author_details.author_path && movie.reviews.results[0].author_details.avatar_path.length >= 35 ? movie.reviews.results[0].author_details.avatar_path.substr(35) : movie.reviews.results[0].author_details.avatar_path) +"?s=64" )} alt="" />

        </div>

      <div className="righthead_review">
        <div className="top_review">
          <div>
          <h3 className="author">{movie.reviews && (movie.reviews.results.length >0 && "A review by"+movie.reviews.results[0].author)}</h3>
        <h4 className="date_review">{movie.reviews && movie.reviews.results.length >0 && (movie.reviews.results[0].updated_at ?"Updated at" +" " + movie.reviews.results[0].updated_at.substr(0,10) + " "+ "by" +" " + movie.reviews.results[0].author  : "Created at" +" "+ movie.reviews.results[0].created_at.substr(0,10) +" "+ "by"+ " " + movie.reviews.results[0].author)}</h4>
          </div>
          <div >
            {movie.reviews.author_details && (movie.reviews.author_details.rating != undefined && <div className="rating_review" >{ "⭐"+" "+ movie.reviews.author_details.rating} </div>)}
          </div>
       </div> 
 
  <p className="review">{movie.reviews &&(movie.reviews.results[0]&&movie.reviews.results[0].content.substr(0,270)+".....")}<a className="full_review" href={movie.reviews && (movie.reviews.results[0] &&  movie.reviews.results[0].url)}
>read the rest.</a></p>

  

  </div>
      </div>
  
    </div> : <p>We don't have any reviews for Clock. Would you like to write one?</p> } 

 <NavLink className="wholereview_reviews" to="/Wholereview" state={movie != undefined &&movie}>Read All Reviews</NavLink>

</div>



    </>
  )
}

export default Reviews
