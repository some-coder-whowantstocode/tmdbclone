import React,{useState,useRef,useEffect,useCallback} from 'react'
import axios from 'axios';
import { Link, NavLink,useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './searchpage.css';
import image from'./inf.png';
import Requests from './Requests';

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

    

    const url= `https://api.themoviedb.org/3/search/multi?api_key=${Requests.apikey}&language=en-US&query=${elem}&page=1&include_adult=false`;


 
//function to load more results when the scroll bar reaches the bottom(

useEffect(()=>{

    try{
        const loadmore = async()=>{
            const newurl = `https://api.themoviedb.org/3/search/multi?api_key=${Requests.apikey}&language=en-US&query=${elem}&page=${pn}}&include_adult=false`;
            const objdata = await axios.get(newurl);
            setnm(objdata.data.data ? objdata.data.data.results : objdata.data.results)
        // newmovie && newmovie.map((res)=>(
        //         setshow((prev)=>[...prev,res])
                
        //     ))
        // objdata.data.data != undefined && objdata.data.data.results.map((res)=>(

        // ))
        }
        loadmore();
    }
    catch(error){
        ////console.log(error);
    }
    console.log(pn)
    
    
},[pn])


useEffect(()=>{
    if(newmovie != undefined && newmovie[0] == show[0]){
        console.log("stop")
    }
    else {
        newmovie != undefined && newmovie && newmovie.map((res)=>(
            setshow((prev)=>[...prev,res])
            
        ))
    }
  
    
    
},[newmovie])



const handleScroll =async()=>{

   
   

    try{
       
        if(window.innerHeight + document.documentElement.scrollTop + 30 >= document.documentElement.scrollHeight){
        
            if(pn<limit){
              
                setpn((prev)=>prev + 1);
                // console.log("fuck this is working")
                
            }
            else{
                //console.log("fuck why the fuck is this not working")
            }
           
            
        }
  
            }
            catch(error){
                ////console.log(error);
            }   
            finally{
                setScrollTop(window.scrollY);
                // console.log(window.scrollY)
            }
  }



  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    // const handleScroll = event => {
    //   setScrollTop(window.scrollY);
    // };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);



   
//)

useEffect(()=>{
    console.log(limit)
},[limit])

    
      
//create the number of pages so that unessesary runs won't happen(     
        useEffect(()=>{
           
             movies.results && setlimit( movies.total_pages ? movies.total_pages : movies.total_pages)
               
       
        },[movies])
//)


//shows search results when the search is done from home page(
    useEffect(()=>{
        setelem(location.state)
        //console.log("elem")
        
    },[location])

//)


//brings the result for the search on search bar
    useEffect(()=>{
        try{
            //console.log(elem)

            const getdata  = async()=>{
                if(elem != null){
                    const objdata = await axios.get(url);
                    
                    setmovies( objdata.data ? objdata.data : objdata.data)
                    setnm(objdata.data.data ? objdata.data.data.results : objdata.data.results)
                    // ////console.log(show)
                   console.log(objdata!= [] && objdata)
                    setpn(objdata.data.page)
                //    setpn(1)
                setshow([])
         
                
                }
              
                
            }
            getdata()
        }
       catch(error){
        //console.log(error);
       }
      
           setnm([])
        
    },[elem])
   
//)

useEffect(()=>{
    show != undefined && console.log(show)
},[show])

    const inputelem = useRef("");

    const log = (e)=>{
        if(e.key=="Enter"){
            setelem(name)
            //console.log(elem)
        }
       
        
    }

    const reg =(e)=>{
        setname(e.target.value)
    }


    const imag =(result)=>{
        switch(result.media_type){
          
            case 'person': return  result.profile_path ? "https://image.tmdb.org/t/p/original"+result.profile_path : image
      
           
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

  return (
    <>
      <Navbar/>
    
      <nav className="searchbar sborder">
      
      <input className='search ' type='text' placeholder='search movies,tv series' onKeyDown={log} onChange={reg} ref={inputelem}/>
     
      </nav>
     
     
    

<div className="serresult">
{(elem&&show)&&show.map((result)=>(
    <div id={result.id} className='resbox'>

        {
           result && result.media_type == "person" ?  <NavLink state={result.id} to="/profile">
            <div className="res">
            <img key={result.id} className='image' src={imag(result) }></img>
            
            </div>
</NavLink>
: result.media_type == "tv" ? <NavLink state={result.id} to="/Tv">
<div className="res">
<img key={result.id} className='image' src={imag(result) }></img>

</div>
</NavLink>
:<NavLink state={result.id} to="/info">
<div className="res">
<img key={result.id} className='image' src={imag(result) }></img>

</div>
</NavLink>
        }
           
<div className="sd">
<h5>{nam(result) }</h5>
<p className='chars'>{result.overview}</p>
</div>

</div>

          
            
        ))}
</div>
     
       
    </>
  )
}

export default Searchpage
