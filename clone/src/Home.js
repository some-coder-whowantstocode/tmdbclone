import React from 'react'
import Row from './Row'
import Requests from './Requests'
import Navbar from './Navbar'
import Search from './Search'
import './home.css'
import Trailerrow from './Trailerrow'

const Home = () => {
  return (
    <div className='body'>
       <Navbar/>
      <Search/>
     
       <Row title="Trending" url={Requests.todaytrending}/> 
       <Trailerrow title={"Latest Trailer"} url={Requests.upcomingmovies}/>

       <Row title="What's Popular" url={Requests.popularmovies}/> 
       <Row title="Top Rated" url={Requests.topratedmovies}/> 

     
    </div>
  )
}

export default Home
