'use strict';

const dinnerApiKey = 'c78d6bb5335bd92c';
const dinnerSearchURL = 'https://cors-anywhere.herokuapp.com/https://eatstreet.com/publicapi/v1/restaurant/search';

const movieApiKey = '354423-Dinneran-7CSLUZNY';
const movieSearchURL = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function startApp() {
    $('.dinnerBox').hide();
    $('.movieBox').hide();
    $('.resultsBox ').hide();
    $('.restartBox').hide();
$('#startAppButton').on('click', function(event)
{
generateDinner();
})
    //event.preventDefault();
}

function generateDinner () {
    $('.headerBox').hide();
    $('.introBox').hide();
    $('.dinnerBox').show();
    displayDinnerForm();
}

function displayDinnerForm() {
    $('#js-dinner-form').submit(event => {
        event.preventDefault();
        const streetAddress = $('#js-search-term-dinner').val();
        const deliveryOrPickup = $("input[name='deliveryOrPickup']:checked").val();
        getDinner(streetAddress, deliveryOrPickup);
      }); 
}

function getDinner(streetAddress, deliveryOrPickup) {
    const params = {
      'street-address': streetAddress,
      method: deliveryOrPickup,
      'access-token': dinnerApiKey,
    };
    const queryString = formatQueryParams(params)
    const dinnerURL = dinnerSearchURL + '?' + queryString;
 
  
    fetch(dinnerURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayDinnerResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

  function displayDinnerResults(responseJson) {
    // if there are previous results, remove them
    $('#dinnerResults').empty();
    
    $('#dinnerResults').append(
        `<h2>Now let's find a movie to watch!</h2><button type="button" id="goToMovieButton">Find a movie</button><br/><br/><h3>Here are a few restaurants that you might want to order from...</h3>
        `)
    for (let i = 0; i < 5 ; i++) {
      // iterate through the items array
      
      $('#dinnerResults').append(
        `<li><h2><a href="${responseJson.restaurants[i].url}" target="_blank">${responseJson.restaurants[i].name}</a></h2>
        <p><img src="${responseJson.restaurants[i].logoUrl}" alt="restaurant logo"></p>
       <p>${responseJson.restaurants[i].streetAddress}<br/>
       ${responseJson.restaurants[i].city}, ${responseJson.restaurants[i].state}, ${responseJson.restaurants[i].zip}<br/>
       ${responseJson.restaurants[i].phone}<br/><br/>
       </p></li>`
      )
    //   var myJSONObject = responseJson.restaurants[0].url;
    //   const dinnerJsonReponseRestaurantName = responseJson.restaurants[0].name;
    //   const dinnerJsonReponseRestaurantLogo = responseJson.restaurants[0].logoUrl;
    //   const dinnerJsonReponseRestaurantAddress = responseJson.restaurants[0].streetAddress;
    //   const dinnerJsonReponseRestaurantCity = responseJson.restaurants[0].city;
    //   const dinnerJsonReponseRestaurantState = responseJson.restaurants[0].state;
    //   const dinnerJsonReponseRestaurantZip = responseJson.restaurants[0].zip;
    //   const dinnerJsonReponseRestaurantPhone = responseJson.restaurants[0].phone;

      $('form').hide();
    };
    $('#goToMovieButton').on('click', function(event)
    {
    generateMovie();
    })
  };

  function generateMovie() {
    $('.headerBox').hide();
    $('.introBox').hide();
    $('.dinnerBox').hide();
    $('.movieBox').show();
    $('form').show();
    displayMovieForm();
  }

  function displayMovieForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term-movie').val();
        const maxResults = 5;
        getMovies(searchTerm, maxResults);
      });
  }


  function getMovies(query, maxResults) {
    const params = {
      q: query,
      type: "movies",
      info: 1,
      limit: maxResults,
      k: movieApiKey,
    };
    const queryString = formatQueryParams(params)
    const movieURL = movieSearchURL + '?' + queryString;
  
    console.log(movieURL);
  
    fetch(movieURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayMovieResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

  function displayMovieResults(responseJson) {
    // if there are previous results, remove them
    $('#movie-results-list').empty();
    $('h2').hide();
    $('#movie-results-list').append(
        `<h1>Now let's view the perfect dinner and movie for you tonight!</h1><button type="button" id="goToResultsButton">View my Dinner & Movie Pairing</button><br/><br/><h3>Here are a few movies that you might want to watch tonight...</h3>`)
        for (let i = 0; i < responseJson.Similar.Results.length; i++) {
      // iterate through the items array
      
      $('#movie-results-list').append(
        `<li><h3><a href="${responseJson.Similar.Results[i].wUrl}" target="_blank">${responseJson.Similar.Results[i].Name}</a></h3>
        <iframe width="560" height="315" src="${responseJson.Similar.Results[i].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>${responseJson.Similar.Results[i].wTeaser}</p></li>`
      )
      $('form').hide();
    };
    $('#goToResultsButton').on('click', function(event)
    {
        generateMovieDinnerPair();
    })
  };

  function generateMovieDinnerPair() {
    $('.headerBox').hide();
        $('.introBox').hide();
        $('.dinnerBox').hide();
        $('.movieBox').hide();
        $('form').show();
        $('h2').show();
        $('.resultsBox').show();
        //displayMovieForm();
        //getDinner();
        $('#dinner-results-list-final').getDinner(streetAddress, deliveryOrPickup).append(`<li><h2><a href="${responseJson.restaurants[0].url}" target="_blank">${responseJson.restaurants[0].name}</a></h2>
        <p><img src="${responseJson.restaurants[0].logoUrl}" alt="restaurant logo"></p>
       <p>${responseJson.restaurants[0].streetAddress}<br/>
       ${responseJson.restaurants[0].city}, ${responseJson.restaurants[0].state}, ${responseJson.restaurants[0].zip}<br/>
       ${responseJson.restaurants[0].phone}<br/><br/>
       </p></li>`)
       getMovies();
        $('#movie-results-list-final').append(`li><h3><a href="${responseJson.Similar.Results[0].wUrl}" target="_blank">${responseJson.Similar.Results[0].Name}</a></h3>
        <iframe width="560" height="315" src="${responseJson.Similar.Results[0].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>${responseJson.Similar.Results[0].wTeaser}</p></li>`)
  }




$(startApp);