let page= 1;
let infiniteScroll;
window.scrollTo(0,0)

searchFormBtn.addEventListener("click" , ()=>{
    location.hash = `#search=${searchFormInput.value.trim()}`

})
arrowBtn.addEventListener("click", ()=>{
    window.history.back()

} )
trendingBtn.addEventListener("click", ()=>{
    location.hash= "trends"
})


window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, { passive : false});

function navigator(){
    if(infiniteScroll){
        window.removeEventListener("scroll", infiniteScroll, { passive : false});
        infiniteScroll = undefined;
    }
    // console.log({location})
    if(location.hash.startsWith("#trends")){
        trendsPage();
        
    }else if ( location.hash.startsWith("#search=")){
        searchPage();
        
    }else if ( location.hash.startsWith("#movie=")){
        movieDetailsPage();
        
    }else if ( location.hash.startsWith("#category=")){
        categoryPage();
        
    }else{
        homePage();
        
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(infiniteScroll){
        window.addEventListener("scroll", infiniteScroll,{ passive : false});

    }

}


function homePage(){
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");


    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewList.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive")

    getCategoriesMoviesPreview();
    getTrendingMoviesPreview();
   
}

function categoryPage(){
    console.log("Category!!")


    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    headerTitleCategories.classList.add("inactive");
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [urlPage, categoryDate] =location.hash.split("=");
    
    const [categoryId, categoryName] = categoryDate.split("-");


    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategories(categoryId);
    

    
}

function searchPage(){
    console.log("Search!!")
        
    
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");

    headerTitleCategories.classList.add("inactive");
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");


    // [#search] [lo que buscamos]
    const [_, query] = location.hash.split("=");
    headerCategoryTitle.innerHTML = query;
    getMoviesBySearch(query);
}

function movieDetailsPage(){
    console.log("Movie!!")
    headerSection.classList.add("header-container--long");
    // headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");


    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");


    const [_,movieId] = location.hash.split("=");
    getMovieById(movieId);
    getMoviesRecomends(movieId);

}

function trendsPage(){
    console.log("Trends!!");
      
    
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    headerTitleCategories.classList.add("inactive");
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    headerCategoryTitle.innerHTML = "Tendencias"
    getTrendingMovies();
    infiniteScroll = getPageTrendingMovies;
}