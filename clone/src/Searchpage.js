import React,{useState,useRef,useEffect,useCallback, useSyncExternalStore} from 'react'
import axios from 'axios';
import { Link, NavLink,useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './searchpage.css';
import image from'./inf.png';
import Requests from './Requests';
import './searchopt.css'
import Profile from './profile.png'

const Searchpage = () => {

    const[elem,setelem]=useState("");
    const[name,setname]=useState("")
    const[movies,setmovies]=useState("");
    const[show,setshow]= useState("");
    const location = useLocation();
    const[limit,setlimit]=useState(0);
    const[pagenumber,setpagenumber]=useState(1);
    const[pn,setpn]=useState(1);
    const[newmovie,setnm]=useState();
    const[sm,setsm]=useState([]);
    const[st,setst]=useState([]);
    const[sp,setsp]=useState([])
    const[type,settype]= useState()
    const[spl,setspl]=useState(0)
    const[stl,setstl]=useState(0)
    const[sml,setsml]=useState(0)
    const[sl,setsl]=useState(0)

    

    const url= `https://api.themoviedb.org/3/search/multi?api_key=${Requests.apikey}&language=en-US&query=${elem}&page=1&include_adult=false`;


 
//function to load more results when the scroll bar reaches the bottom(

useEffect(()=>{

    try{
        const loadmore = async()=>{
            const newurl = `https://api.themoviedb.org/3/search/multi?api_key=${Requests.apikey}&language=en-US&query=${elem}&page=${pn}}&include_adult=false`;
            const objdata = await axios.get(newurl);
            setnm(objdata.data.data ? objdata.data.data.results : objdata.data.results)
        }
        loadmore();
    }
    catch(error){
        console.log(error.response?.objdata?.error);
    }
   
    console.log( "pn"+pn)
    
},[pn])

useEffect(()=>{
    elem &&setspl(sp.length)
},[sp])

useEffect(()=>{
    elem &&setstl(st.length)
},[st])

useEffect(()=>{
    elem &&setsml(sm.length)
},[sm])

useEffect(()=>{
    elem &&setsl(show.length)
},[show])


useEffect(()=>{
    if(newmovie != undefined && newmovie[0] == show[0]){
    }
    else {


        if (newmovie != undefined) {


        newmovie.map((res)=>(
                setshow((prev)=>[...prev,res])
            ))


            newmovie.map((res) => {
              switch (res.media_type) {
                case "movie": setsm((prev)=>[...prev,res])
                  break;

                case "tv": setst((prev)=>[...prev,res])
                  break;

                  case "person" : setsp((prev)=>[...prev,res])
                  break;
                  case "default" : console.log("nothing")
              }
            })
          }
       
    }
},[newmovie])



const handleScroll =async()=>{
    try{
       
        if(window.innerHeight + document.documentElement.scrollTop + 30 >= document.documentElement.scrollHeight){
            if(pn<limit){
                setpn((prev)=>prev + 1);
            }
        }
            }
            catch(error){     
            }   
            finally{
                setScrollTop(window.scrollY);
            }
  }



  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);



   
//)    
      
//create the number of pages so that unessesary runs won't happen(     
        useEffect(()=>{
           
             movies.results && setlimit( movies.total_pages ? movies.total_pages : movies.total_pages)
               
       
        },[movies])
//)


//shows search results when the search is done from home page(
    useEffect(()=>{
        setelem(location.state)
    },[location])

//)


//brings the result for the search on search bar
    useEffect(()=>{
        try{
            const getdata  = async()=>{
                if(elem != null){
                    const objdata = await axios.get(url);
                    
                    setmovies( objdata.data ? objdata.data : objdata.data)
                    setnm(objdata.data.data ? objdata.data.data.results : objdata.data.results)
                    setpn(objdata.data.page)
                setshow([])
                setsm([])
                setst([])
                setsp([])
                setspl(0)
                setsml(0)
                setstl(0)
                setsl(0)
                }
            }
            getdata()
        }
       catch(error){
        console.log(error.response?.objdata?.response);
       }
           setnm([])
        
    },[elem])
   
//)



    const inputelem = useRef("");

    const log = (e)=>{
        if(e.key=="Enter"){
            setelem(name)
        }
    }

    const reg =(e)=>{
        setname(e.target.value)
    }


    const imag =(result)=>{
        switch(result.media_type){
          
            case 'person': return  result.profile_path ? "https://image.tmdb.org/t/p/original"+result.profile_path : Profile
      
           
            case 'movie': return  result.poster_path ? "https://image.tmdb.org/t/p/original"+result.poster_path : image
            
            case 'tv': return result.poster_path ? "https://image.tmdb.org/t/p/original"+result.poster_path : image

            default : return image
          
}


    }

    const nam = (result)=>{
        switch(result.media_type){
            case 'person': return result.name?result.name : (result.original_name ? result.original_name : elem)

            case 'movie': return result.title?result.title : (result.original_title ? result.original_title : elem)

            case 'tv': return result.name?result.name : (result.original_name ? result.original_name : elem)

            default : return elem
        }
    }

const sho =(type)=>{
    switch(type){
        case "movie" : return (elem&&sm)&&sm.map((result)=>(
            <div  className='resbox'>
        
                {
                   result && result.media_type == "person" ?  <NavLink state={result.id} to="/profile">
                    <div className="res">
                    <img  className='image' src={imag(result) }></img>
                    
                    </div>
        </NavLink>
        : result.media_type == "tv" ? <NavLink state={result.id} to="/Tv">
        <div className="res">
        <img  className='image' src={imag(result) }></img>
        
        </div>
        </NavLink>
        :<NavLink state={result.id} to="/info">
        <div className="res">
        <img  className='image' src={imag(result) }></img>
        
        </div>
        </NavLink>
                }
                   
        <div className="sd">
        <h5>{nam(result) }</h5>
        <p className='chars'>{result.overview}</p>
        </div>
        
        </div>  
                ))

        case "tv" : return (elem&&st)&&st.map((result)=>(
                    <div  className='resbox'>
                
                        {
                           result && result.media_type == "person" ?  <NavLink state={result.id} to="/profile">
                            <div className="res">
                            <img  className='image' src={imag(result) }></img>
                            
                            </div>
                </NavLink>
                : result.media_type == "tv" ? <NavLink state={result.id} to="/Tv">
                <div className="res">
                <img  className='image' src={imag(result) }></img>
                
                </div>
                </NavLink>
                :<NavLink state={result.id} to="/info">
                <div className="res">
                <img  className='image' src={imag(result) }></img>
                
                </div>
                </NavLink>
                        }
                           
                <div className="sd">
                <h5>{nam(result) }</h5>
                <p className='chars'>{result.overview}</p>
                </div>
                
                </div>  
                        ))


        case "person" : return (elem&&sp)&&sp.map((result)=>(
                            <div  className='resbox'>
                        
                                {
                                   result && result.media_type == "person" ?  <NavLink state={result.id} to="/profile">
                                    <div className="res">
                                    <img  className='image' src={imag(result) }></img>
                                    
                                    </div>
                        </NavLink>
                        : result.media_type == "tv" ? <NavLink state={result.id} to="/Tv">
                        <div className="res">
                        <img  className='image' src={imag(result) }></img>
                        
                        </div>
                        </NavLink>
                        :<NavLink state={result.id} to="/info">
                        <div className="res">
                        <img  className='image' src={imag(result) }></img>
                        
                        </div>
                        </NavLink>
                                }
                                   
                        <div className="sd">
                        <h5>{nam(result) }</h5>
                        <p className='chars'>{result.overview}</p>
                        </div>
                        
                        </div>  
                                ))


       default : return(elem&&show)&&show.map((result)=>(
        <div  className='resbox'>
    
            {
               result && result.media_type == "person" ?  <NavLink state={result.id} to="/profile">
                <div className="res">
                <img  className='image' src={imag(result) }></img>
                
                </div>
    </NavLink>
    : result.media_type == "tv" ? <NavLink state={result.id} to="/Tv">
    <div className="res">
    <img  className='image' src={imag(result) }></img>
    
    </div>
    </NavLink>
    :<NavLink state={result.id} to="/info">
    <div className="res">
    <img  className='image' src={imag(result) }></img>
    
    </div>
    </NavLink>
            }
               
    <div className="sd">
    <h5>{nam(result) }</h5>
    <p className='chars'>{result.overview}</p>
    </div>
    
    </div>  
            ))
    }
}

const change =(type)=>{
    // return sho(type)
    settype(type)
    switch(type){
        case "movie" : 
    }
}

const gototop=()=>{
    window.scrollTo({top : 0,left : 0 ,behavior:'smooth'})
}


  return (
    <>
      <Navbar/>
    
      <nav className="searchbar sborder">
      
      <input className='search ' type='text' placeholder='search movies,tv series' onKeyDown={log} onChange={reg} ref={inputelem}/>
     
      </nav>
     
     
    <div className='searchbigbox'>
<div className="serchresultbox">

<div className="sebleft">
<div className="serresult">
    {sho(type)}

</div>
</div>

<div className="sebright">
<div className='optionbox'>
        <div className="obhead" >Results </div>
      <div className="obmovie" onClick={()=>change("movie")}><span>Movie</span> <span className='obs'>{sml}</span></div>
      <div className="obtvseries" onClick={()=>change("tv")}><span>Tv-Series</span> <span className='obs'>{stl}</span></div> 
       <div className="obperson" onClick={()=>change("person")}><span>Person</span> <span className='obs'>{spl}</span></div>
      <div className='oball' onClick={()=>change()}><span>All</span> <span className='obs'>{sl}</span></div>
    </div>
</div>

</div>

</div>

<button className='gototop' onClick={gototop}>↑</button>
       
    </>
  )
}

export default Searchpage
