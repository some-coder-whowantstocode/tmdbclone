import './App.css';
import Home from './Home';
import Info from './Info';
import Tv from './Tv';
import Wholecrew from './Wholecrew';
import Wholereview from './Wholereview';
import Searchpage from './Searchpage';
import Profile from './Profile';
import Trailer from './Trailer';
import Wholeseason from './Wholeseason';
import Episode from './Episode';
import {Routes,Route } from 'react-router-dom';
import './responsive.css'

function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/info' element={<Info/>}/>
    <Route path='/searchpage' element={<Searchpage/>}/>
    <Route path='/wholecrew' element={<Wholecrew/>}/>
    <Route path='/wholereview' element={<Wholereview/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/tv' element={<Tv/>}/>
    <Route path='/wholeseason' element={<Wholeseason/>}/>
    <Route path='/trailer' element={<Trailer/>}/>
    <Route path='/episode' element={<Episode/>}/>
   </Routes>
   </>
  );
}

export default App;
