

const API_KEY="2edbada9d611ecca8a2420c593d0659b";

const Requests = {
    popularmovies:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    latestmovies:`https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US`,
    nowplayingmovies:`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    topratedmovies:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    upcomingmovies:`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    todaytrending:`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
    tvlatest:`https://api.themoviedb.org/3/tv/latest?api_key=${API_KEY}&language=en-US`,
    tvgeneres:`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
    
}

export default Requests