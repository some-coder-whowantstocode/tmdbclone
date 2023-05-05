import './progress.css'

const Progress = ({rating,siz,display}) => {

   let r;
   let pro;
   const full = 136;
   r = Math.round(rating*10);
   pro = Math.round(136-(136*(r/100))) ;
   // pro=40;
   let limit = 42;
   //  console.log(pro)


  return (
    
   <div className="progress bg-transparent w-auto h-auto" style={{transform : `scale(${siz})`}}>
   <div className="outer">
    <div className="inner">
        <div className="number">{r>0 ? r : "NR"}</div>
        <div className='sup'>{r>0? "%" : ""}</div>
    </div>
   <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
    <defs>
       <linearGradient id="GradientColor">
          <stop offset="0%" stopColor="#e91e63" />
          <stop offset="100%" stopColor="#673ab7" />
       </linearGradient>
    </defs>
    <circle style={{strokeDashoffset : `${pro }`, stroke: `${pro>= limit ? `${pro>135 ? "transparent" : "yellow"}` :"green"  }` }} className="circle" cx="80" cy="70" r="22" strokeLinecap="round" />
</svg>
   </div>
</div>


  )
}

export default Progress
