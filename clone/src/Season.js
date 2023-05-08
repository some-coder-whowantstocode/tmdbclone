import React, { useEffect, useState } from 'react'
import './season.css'
import { NavLink } from 'react-router-dom';
import Imag from './inf.png'

const Season = ({mov,movi}) => {
    const[data,setdata] = useState([]);
    const[pos,setpos]=useState();
    useEffect(()=>{
        setdata(mov);
    },[mov])

    useEffect(()=>{
        setpos(data.seasons && data.number_of_seasons-1)
    },[data])

  
   

  return (
    <>
    {
        data.seasons && data.seasons.length >0 ? <div>
 <h2 className="current_season">Current Season</h2>
    <div className="cs">
        <div className="leftcs">
            <NavLink to="/episode" state={[data?.id ?? ' ' , pos+1]} >
            <img  className='image_season' src={ (data != undefined && data.seasons && data.seasons[pos]&& data.seasons[pos].poster_path ? (data.seasons[pos].poster_path !== null ? "https://image.tmdb.org/t/p/w185"+ data.seasons[pos].poster_path : Imag) : Imag)} alt="" />
            </NavLink>
        </div>
        <div className="rightcs">
            <div>

          
            <h3 className='name_season'>{data != undefined && data.seasons && data.seasons[data.seasons.length - 1] && data.seasons[data.seasons.length -1].name}</h3>
            <div className="infocs">
                <div className="leftifc">
                    {(data != undefined && data.seasons && data.seasons[pos] && pos !=undefined && data.seasons[pos].air_date.substr(0,4))}
                </div>
                <div className="rightifc">
                    <div className="rightifctop">
                    {(data != undefined && data.seasons && data.seasons[pos] && pos !=undefined && data.seasons[pos].episode_count)+" "}Episodes
                    </div>
                    
                </div>
            </div>
            </div>

            <div className="bottom_seasons">
                        {data != undefined && data.last_episode_to_air && data.last_episode_to_air.overview}
                    </div>

        </div>
    </div>


    <NavLink to='/wholeseason' state={data.id} className="wholese">
        View all seasons
    </NavLink>
        </div>
        : <div>Currently no sesons available</div>
    }
   
    </>
  )
}

export default Season
