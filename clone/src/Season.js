import React, { useEffect, useState } from 'react'
import './season.css'
import { NavLink } from 'react-router-dom';

const Season = ({mov,movi}) => {
    const[data,setdata] = useState([]);
    const[pos,setpos]=useState();
    useEffect(()=>{
        setdata(mov);
    },[mov])

    useEffect(()=>{
        // console.log(data.seasons && data.seasons[parseInt(data.seasons.length) -1] )
        // console.log(data)
        setpos(data.seasons && parseInt(data.seasons.length) -1)
        // console.log(data.seasons[data.seasons.length -1].poster_path)
    },[data])
  return (
    <>
    <h2 className="current_season">Current Season</h2>
    <div className="cs">
        <div className="leftcs">
        <img className='image_season' src={"https://image.tmdb.org/t/p/w185"+ (data != undefined && pos !=undefined && data.seasons[pos].poster_path)} alt="" />
        </div>
        <div className="rightcs">
            <div>

          
            <h3 className='name_season'>Season {pos+1}</h3>
            <div className="infocs">
                <div className="leftifc">
                    {(data != undefined && pos !=undefined && data.seasons[pos].air_date.substr(0,4))}
                </div>
                <div className="rightifc">
                    <div className="rightifctop">
                    {(data != undefined && pos !=undefined && data.seasons[pos].episode_count)+" "}Episodes
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
    </>
  )
}

export default Season
