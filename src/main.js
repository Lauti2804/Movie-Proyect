const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY,
    },
});



function createMovies(movies,container){
    container.innerHTML = "";
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
            "src", 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
     
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
 
    createCategories(categories,categoriesPreviewList);
}



async function getTrendingMoviesPreview(){
    const {data} = await api(`/trending/movie/day`)
    const movies  = data.results; 
    createMovies(movies,trendingMoviesPreviewList)
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
    
    createMovies(movies,genericSection)
}

async function getTrendingMovies(){
    const {data} = await api(`/trending/movie/day`)
    const movies  = data.results; 

    createMovies(movies,genericSection)
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
