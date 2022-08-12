const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY,
    },
});

//Utils
const lazyLoaded = new IntersectionObserver((entries)=>{
    entries.map(entry=>{
      
       const URL =  entry.target.getAttribute("data-img");
        if(entry.isIntersecting){

            entry.target.setAttribute("src", URL);
        }else{
            entry.target.setAttribute("src", "")
        }
    //    console.log(entry)
    })
})



function createMovies(movies
    ,
    container,
    {
    lazyLoad = false,
    clean = true
    }={}){
    if(clean){
        container.innerHTML = "";
    }
    movies.map(movie=>{ 
       
        const divContainer = document.createElement("div");
        divContainer.classList.add("movie-container");
        divContainer.addEventListener("click", ()=>{
            location.hash= `#movie=${movie.id}`;
        })
        const img = document.createElement("img")
        img.classList.add("movie-img");
        img.setAttribute("alt", movie.title);
        img.setAttribute(
         lazyLoad ?   "data-img" : "src", 
         movie.poster_path !== null ?
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : `https://as01.epimg.net/meristation/imagenes/2021/04/26/reportajes/1619438192_264857_1619438392_sumario_normal.jpg`
        )
            
            if(lazyLoad){
                lazyLoaded.observe(img)    
            }
        divContainer.appendChild(img);
        container.appendChild(divContainer)

    })
}
function createCategories(categories, container) {
  container.innerHTML = "";

  categories.map(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getCategoriesMoviesPreview(){
    const {data} = await api(`/genre/movie/list`)
    const categories  = data.genres;
 
    createCategories(categories,categoriesPreviewList, {lazyLoad:true, clean:true});
}
async function getPageCategoriesMoviesPreview(){
    const {data} = await api(`/genre/movie/list`)
    const categories  = data.genres;
 
    createCategories(categories,categoriesPreviewList, {lazyLoad:true, clean:true});
}
async function getTrendingMoviesPreview(){
    const {data} = await api(`/trending/movie/day`)
    const movies  = data.results; 
    createMovies(movies,trendingMoviesPreviewList, {lazyLoad:true, clean:true})
}

async function getMoviesByCategories(id){
    const {data} = await api(`/discover/movie`,{
        params: {
            with_genres:id,
        }
    })
    const movies  = data.results; 
    createMovies(movies,genericSection)
}

async function getMoviesBySearch(query){
    const {data} = await api(`/search/movie`,{
        params: {
            query
        }
    })
    const movies  = data.results; 
    
    createMovies(movies,genericSection, {lazyLoad:true})
}

async function getMovieById(id){
    const {data: movie} = await api(`/movie/${id}`)
    
    const movieImg =  `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    headerSection.style.background = ` linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImg})`;
    headerSection.style.backgroundPosition = 'center';
    headerSection.style.backgroundSize= "cover";
    movieDetailTitle.textContent= movie.title;
    movieDetailDescription.textContent= movie.overview;
    movieDetailScore.textContent=movie.vote_average.toFixed(1) ;
    createCategories(movie.genres, movieDetailCategoriesList);
    
}

async function getMoviesRecomends(id){
    const {data} = await api(`/movie/${id}/recommendations`)
    const reloadMovies  = data.results; 

    movieDetails.innerHTML = "";
    createMovies(reloadMovies, movieDetails);
}


async function getTrendingMovies(){
    const {data} = await api(`/trending/movie/day`)
    const movies  = data.results; 

    createMovies(movies,genericSection)

    
}

async function getPageTrendingMovies(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    if(scrollIsBottom){
        page++
        const {data} = await api(`/trending/movie/day`,{
            params:{
                page,
            }
        })
        const movies  = data.results; 
    
        createMovies(movies,genericSection, {lazyLoad: true, clean:false })
        
    }

    // window.scrollTo(0,0)
    // const btnLoadMore = document.createElement("button");
    // btnLoadMore.textContent = "Add more";
    // genericSection.appendChild(btnLoadMore);
    // btnLoadMore.addEventListener("click", () =>  getPageTrendingMovies() && btnLoadMore.remove())
}


