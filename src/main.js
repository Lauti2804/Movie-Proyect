const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY,
    },
});


async function getTrendingMoviesPreview(){
    const {data} = await api(`/trending/movie/day`)
    const movies  = data.results;

    movies.map(movie=>{

        const trendingPreviewMovieList = document.querySelector(".trendingPreview-movieList")
        const divContainer = document.createElement("div");
        divContainer.classList.add("movie-container");

        const img = document.createElement("img")
        img.classList.add("movie-img");
        img.setAttribute("alt", movie.title);
        img.setAttribute(
            "src", 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`)

        divContainer.appendChild(img);
        trendingPreviewMovieList.appendChild(divContainer)

    })
}



async function getCategoriesMoviesPreview(){
    const {data} = await api(`/genre/movie/list`)
    const categories  = data.genres;

    categories.map(category=>{
        const categoriesPreviewContainer = document.querySelector(".categoriesPreview-list");


        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");



        const categoryTitle = document.createElement("h3")
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id", "id" + category.id)
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewContainer.appendChild(categoryContainer);
        
    })
}
