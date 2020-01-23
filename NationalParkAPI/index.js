'use strict';

const apiKey = 'gU8BFiUBoe8fUMIzQVzogyLOlJJRWNsICF2lGPU0';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++) {

        //The parks in the given state must be displayed on the page
        //full name
        //description,
        //and website URL
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
        )
    };
    //stretch goal add parks address
    //display the results section  
    $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: query,
        limit: maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(searchTerm, maxResults);
    });
}

$(watchForm);