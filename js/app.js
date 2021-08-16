/***************************************** VARIABLES *************************************************/
const division=document.querySelector('#courses-list');
const shoppingList=document.querySelector('tbody');


/************************************** EVENT LISTENERS *********************************************/
alleventListeners();
function alleventListeners(){
    division.addEventListener('click',addMovieToShoppingCard);
    document.addEventListener('DOMContentLoaded',showDataOnLoaded);
    document.querySelector('tbody').addEventListener('click',deleteMovieFromShopingCard);
    document.querySelector('#clear-cart').addEventListener('click',deleteAll);
}




/**************************************** FUNCTIONS ************************************************/

///////////////////////////// add movie to shopping card ////////////////////////////////////
function addMovieToShoppingCard(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
       let movie=e.target.parentElement.parentElement;

       getMovieInformation(movie);
    }
}

/////////////////////////////// get data of each movie /////////////////////////////////////
function getMovieInformation(movie) {
    let movieInfo={
        image:movie.querySelector('img').src,
        name:movie.querySelector('h4').textContent,
        price:movie.querySelector('span').textContent,
        id:movie.querySelectorAll('a')[1].getAttribute('data-id')
    }

    addInfoToTable(movieInfo);
    addMovieToLS(movieInfo);

}

//////////////////////////// add informations to table of shopping card /////////////////////////////
function addInfoToTable(movieInfo) {
    let row=document.createElement('tr');
    row.innerHTML=`
        <td>
            <img src="${movieInfo.image}" width="50px" height="50px">
        </td>
        <td> ${movieInfo.name}</td>
        <td>${movieInfo.price}</td>
        <td>
            <a href="#" data-id="${movieInfo.id}" class="remove">x</a>
        </td>
    `
    shoppingList.appendChild(row);

}

//////////////////////////// get movie from local storage /////////////////////////////
function getDataFromLS() {
    let movies;
    let getMovie=localStorage.getItem('movies');
    if (getMovie) {
        movies=JSON.parse(getMovie);
    } else {
        movies=[];
    }
    return movies;
}

//////////////////////////// add movie to local storage /////////////////////////////
function addMovieToLS(movieInfo) {
    let movies=getDataFromLS();
    movies.push(movieInfo);
   localStorage.setItem('movies',JSON.stringify(movies));
}

//////////////////////////// show datas when loaded /////////////////////////////
function showDataOnLoaded() {
    let courses=getDataFromLS();
    courses.forEach(function(movieInfo) {
        let row=document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${movieInfo.image}" width="50px" height="50px">
            </td>
            <td> ${movieInfo.name}</td>
            <td>${movieInfo.price}</td>
            <td>
                <a href="#" data-id="${movieInfo.id}" class="remove">x</a>
            </td>
        `
        shoppingList.appendChild(row)
    });

}

//////////////////////////// delete data from shopping card /////////////////////////////
function deleteMovieFromShopingCard(e) {
    let movie,movieId;
    if (e.target.classList.contains('remove')) {
       e.target.parentElement.parentElement.remove();
        movie=e.target.parentElement.parentElement;
        movieId=movie.querySelector('a').getAttribute('data-id');
    }
deleteDataFromLS(movieId);
}

//////////////////////////// delete data from local storage /////////////////////////////
function deleteDataFromLS(id) {
    let movies=getDataFromLS();
    movies.forEach(function(item,index) {
       if (item.id===id) {
        movies.splice(index,1);
        } 
    });
    localStorage.setItem('movies',JSON.stringify(movies));
    
}


//////////////////////////// delete all datas from shopping card /////////////////////////////
function deleteAll() {
    shoppingList.remove();
    deleteAllDatasFromLS();
}

//////////////////////////// delete all datas from local storage /////////////////////////////
function deleteAllDatasFromLS() {
    localStorage.clear();  
}
