async function getTrendingMoviesPreview(){
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    const data = await response.json();
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
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    const data = await response.json();
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
getCategoriesMoviesPreview();
getTrendingMoviesPreview();