"use strict";

  const dinnerApiKey = "c78d6bb5335bd92c";
  const dinnerSearchURL =
    "https://cors-anywhere.herokuapp.com/https://eatstreet.com/publicapi/v1/restaurant/search";

  let responseJsonResultsDinner = [];

  let currentDinnerIndex = Math.floor(Math.random() * 10);

  const movieApiKey = "354423-Dinneran-7CSLUZNY";
  const movieSearchURL =
    "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar";

  let responseJsonResultsMovie = [];

  let currentMovieIndex = Math.floor(Math.random() * 10);

  function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join("&");
  }

  function startApp() {
    $(".dinnerBox").hide();
    $(".movieBox").hide();
    $(".resultsBox ").hide();
    $(".restartBox").hide();
    $("#startAppButton").on("click", function(event) {
      generateDinner();
    });
  }

  function generateDinner() {
    $(".headerBox").hide("slow");
    $(".introBox").hide("slow");
    $(".dinnerBox").show("slow");
    displayDinnerForm();
  }

  function displayDinnerForm() {
    $("#js-dinner-form").submit(event => {
      event.preventDefault();
      const streetAddress = $("#js-search-term-dinner").val();
      const deliveryOrPickup = $(
        "input[name='deliveryOrPickup']:checked"
      ).val();
      getDinner(streetAddress, deliveryOrPickup);
    });
  }

  function getDinner(streetAddress, deliveryOrPickup) {
    const params = {
      "street-address": streetAddress,
      method: deliveryOrPickup,
      "access-token": dinnerApiKey
    };
    const queryString = formatQueryParams(params);
    const dinnerURL = dinnerSearchURL + "?" + queryString;

    fetch(dinnerURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })

      .then(responseJson => storeDinnerResults(responseJson))
      .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`);
      });
  }

  function storeDinnerResults(responseJson) {
    responseJsonResultsDinner = responseJson;
    displayDinnerResults();
  }

  function displayDinnerResults() {
    // if there are previous results, remove them
    $("#dinnerResults").empty();
    $("h4").hide("slow");
    $("p").hide("slow");
    $(".takeout").hide("slow");
    $("#dinnerResults").append(
      `<h2>Now let's find a movie to watch!</h2><br/><br/><button type="button" id="goToMovieButton">Find a movie</button><br/><br/>`
    );
    for (let i = 0; i < 10; i++) {
      $("form").hide();
    }
    $("#goToMovieButton").on("click", function(event) {
      generateMovie();
    });
  }

  function generateMovie() {
    $(".headerBox").hide("slow");
    $(".introBox").hide("slow");
    $(".dinnerBox").hide("slow");
    $(".movieBox").show("slow");
    $("form").show("slow");
    displayMovieForm();
  }

  function displayMovieForm() {
    $("#findMovieButton").on("click", function(event) {
      event.preventDefault();
      const searchTerm = $("#js-search-term-movie").val();
      const maxResults = 10;
      getMovies(searchTerm, maxResults);
    });
  }

  function getMovies(query, maxResults) {
    const params = {
      q: query,
      type: "movies",
      info: 1,
      limit: maxResults,
      k: movieApiKey
    };
    const queryString = formatQueryParams(params);
    const movieURL = movieSearchURL + "?" + queryString;


    fetch(movieURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })

      .then(responseJson => storeMovieResults(responseJson))
      .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`);
      });
  }

  function storeMovieResults(responseJson) {
    responseJsonResultsMovie = responseJson;
    displayMovieResults();
  }

  function displayMovieResults() {
    // if there are previous results, remove them
    $("#movie-results-list").empty();
    $("h2").hide("slow");
    $("form").hide("slow");
    $(".film").hide("slow");
    $("#movie-results-list").append(
      `<h1>Now let's find the perfect dinner and movie for you to watch tonight!</h1><br/><br/><button type="button" id="goToResultsButton">View my Dinner & Movie Pairing</button><br/><br/>`
    );
    for (let i = 0; i < responseJsonResultsMovie.Similar.Results.length; i++) {}
    $("#goToResultsButton").on("click", function(event) {
      generateMovieDinnerPair();
    });
  }

  function generateMovieDinnerPair() {
    $(".headerBox").hide("slow");
    $(".introBox").hide("slow");
    $(".dinnerBox").hide("slow");
    $(".movieBox").hide("slow");
    $("form").show("slow");
    $("h2").show("slow");
    $("p").show("slow");
    $(".resultsBox").show("slow");

    $("#dinner-results-list-final").append(
      `<li><h3><a href="${responseJsonResultsDinner.restaurants[currentDinnerIndex].url}" target="_blank">${responseJsonResultsDinner.restaurants[currentDinnerIndex].name}</a></h3><br/>
        <p><img src="${responseJsonResultsDinner.restaurants[currentDinnerIndex].logoUrl}" alt="restaurant logo" class="image"></p><br/>
       <p>${responseJsonResultsDinner.restaurants[currentDinnerIndex].streetAddress}<br/>
       ${responseJsonResultsDinner.restaurants[currentDinnerIndex].city}, ${responseJsonResultsDinner.restaurants[currentDinnerIndex].state}, ${responseJsonResultsDinner.restaurants[currentDinnerIndex].zip}<br/>
       ${responseJsonResultsDinner.restaurants[currentDinnerIndex].phone}<br/><br/>
       </p></li><br/><br/>`
    );

    $(
      "#movie-results-list-final"
    ).append(`<li><h3><a href="${responseJsonResultsMovie.Similar.Results[currentMovieIndex].wUrl}" target="_blank">${responseJsonResultsMovie.Similar.Results[currentMovieIndex].Name}</a></h3><br/>
    <br/><br/><iframe width="280" height="158" class="video" src="${responseJsonResultsMovie.Similar.Results[currentMovieIndex].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/><p>${responseJsonResultsMovie.Similar.Results[currentMovieIndex].wTeaser}</p></li><br/><br/>
        <button type="button" id="goToRestartButton">Restart the app</button><br>
        <br>
        <button type="button" id="moreRecommendations">Get more Dinner & Movie Recommendations</button><br/><br/>`);
    $("#goToRestartButton").on("click", function(event) {
      document.location.reload();
      startApp();
    });

    $("#moreRecommendations").on("click", function(event) {
      moreDinnerMoviePairs();
    });
  }

  function moreDinnerMoviePairs() {
    currentMovieIndex = Math.floor(Math.random() * 10);
    currentDinnerIndex = Math.floor(Math.random() * 10);
    $("#dinner-results-list-final").empty();
    $("#movie-results-list-final").empty();
    $("#dinner-results-list-final").append(
      `<li><h3><a href="${responseJsonResultsDinner.restaurants[currentDinnerIndex].url}" target="_blank">${responseJsonResultsDinner.restaurants[currentDinnerIndex].name}</a></h3><br/>
          <p><img src="${responseJsonResultsDinner.restaurants[currentDinnerIndex].logoUrl}" alt="restaurant logo" class="image" width="280"></p><br/>
         <p>${responseJsonResultsDinner.restaurants[currentDinnerIndex].streetAddress}<br/>
         ${responseJsonResultsDinner.restaurants[currentDinnerIndex].city}, ${responseJsonResultsDinner.restaurants[currentDinnerIndex].state}, ${responseJsonResultsDinner.restaurants[currentDinnerIndex].zip}<br/>
         ${responseJsonResultsDinner.restaurants[currentDinnerIndex].phone}<br/><br/>
         </p></li><br/><br/>`
    );
    $(
      "#movie-results-list-final"
    ).append(`<li><h3><a href="${responseJsonResultsMovie.Similar.Results[currentMovieIndex].wUrl}" target="_blank">${responseJsonResultsMovie.Similar.Results[currentMovieIndex].Name}</a></h3><br/>
    <br><br><iframe width="280" height="158" class="video" src="${responseJsonResultsMovie.Similar.Results[currentMovieIndex].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/><p>${responseJsonResultsMovie.Similar.Results[currentMovieIndex].wTeaser}</p></li><br/><br/>
        <button type="button" id="goToRestartButton">Restart the app</button><br>
        <br>
        <button type="button" id="moreRecommendations">Get more Dinner & Movie Recommendations</button><br/><br/>`);
    $("#goToRestartButton").on("click", function(event) {
      document.location.reload();
      startApp();
    });
    $("#moreRecommendations").on("click", function(event) {
      moreDinnerMoviePairs();
    });
  }

  $(startApp);

