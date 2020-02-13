# Thinkful API Hack Capstone - Dinner and a Movie Web App



## Programmer
Chanda Hubbard

[>Live URL<](https://chandahubbard.github.io/API-Hack-Capstone/)



## Motivation

Sometimes you just want a nice relaxing night in, while ordering dinner and watching a good movie.  There are so many restaurants and movies to choose from, and it can be very hard to make a selection.  This app was created to help users avoid the decision paralysis that happens when they need to deicde on a resturaunt to eat at, or when they need to decide on a movie to watch. First, the user will input their location and the app will show the information for a takeout restaurant nearby.  Then the user will input a movie that they like and the app will show them a recommendation and trailer for a similar movie.


## Summary

<b>Dinner and a Movie</b> is a responsive web app that helps users decide where to order dinner and which movie to watch for a fun night in.  Users input their location and it is sent to the [EatStreet API Endpoint](https://developers.eatstreet.com/endpoint/search) to find restaurants that provide food delivery or pickup nearby. Users will then navigate to a screen where they can input a movie that they like so that they can receive similar movie recommendations using the [TasteDive Movie API Endpoint](https://tastedive.com/read/api) 



## Built with:

    #### HTML <br/>CSS <br/>Javascript <br/>jQuery <br/>Restful APIs <br/>  + [EatStreet API](https://developers.eatstreet.com/endpoint/search)  <br/>   [TasteDive Movie API ](https://tastedive.com/read/api)<br/>Visual Studio Code <br/>Git Hub



## Process

##### [> Initial wireframes<](https://docs.google.com/document/d/16hyz31opJRNBHMy4-gDB9pLsdS5OK1MZCCaQCb7vhCo/edit?usp=sharing)

### Wireframe images

<img src="content/wireframe.png" alt="Wireframe" width="400">

##### [> Initial User Stories<](https://docs.google.com/spreadsheets/d/1FB6xBWHgIpJLK6rlRdFN-CHQ4ed_Hvct-nbLKT8k22w/edit?usp=sharing)

### Version MVP (Minimal Viable Product)

[>MVP<](https://chandahubbard.github.io/API%20Hack%20Capstone/index.html)

#### Image of MVP Title Screen

<img src="content/MVP1.png" alt="Image of MVP Title Screen" width="300">

#### Image of MVP Results Screen

<img src="content/MVP6.png" alt="Image of MVP Results Screen" width="900">

### Styling with a little bit of CSS

After researching the <i>Psychology of Color</i>, I decide that I would either choose a red or orange color scheme for my styling.  Red, because it symbolizes entertainment, for the movie portion of the app. Or orange, because it symbolizes food/hunger, for the food delivery portion of the app.  I ended up with a red based color theme from Adobe called,  [Sosialisasi Speak Up 19](https://color.adobe.com/Sosialisasi-Speak-Up-19-color-theme-14114879/https://color.adobe.com/Sosialisasi-Speak-Up-19-color-theme-14114879/) , which can be viewed below.

<br/><img src="content/colortheme.png" alt="Style Title" width="600">

<img src="content/intro.png" alt="Style Title" width="400"><br/>



## Final version at different breakpoints

### Mobile

<img src="content/mobile.png" alt="Final Title Screen on Mobile Version" width="250">

### Tablet

<img src="content/tablet.png" alt="Final Title Screen on Tablet Version" width="300">

### Desktop/other

<img src="content/desktop.png" alt="Final Title Screen on Desktop Version" width="400">



## Final version & User Flows

### Screen 1 
#### Landing Page which Navigates to a Dinner Input screen once the "Let's Go" button is clicked 
<img src="content/intro.png" alt="Intro Screen on Tablet Version" width="500" align="center">

### Screen 2
#### Dinner Input screen, where the user can provide their location and select delivery and pickup options
<img src="content/dinnerinput.png" alt="Dinner Input Screen on Tablet Version" width="500">

### Screen 3
#### Flows the user from the dinner input screen to the movie input screen once the "Find a Movie" button is clicked
<img src="content/flowtomovie.png" alt="Flow from Dinner input to Movie input Screen on Tablet Version" width="500">

### Screen 4
#### Movie input screen that allows used to provide a movie they would like to see similar recommendations for
<img src="content/movieinput.png" alt="Movie Input Screen on Tablet Version" width="500">

### Screen 5
#### Flows the user from the movie input screen to the results screen once the "View Dinner & Movie Pairing" button is clicked
<img src="content/flowtoresults.png" alt="Flow from movie input to results Screen on Tablet Version" width="500">

### Screen 6
#### Flows the user to the results screen where they can view their restaurant recommendation and their movie recommendation.
<img src="content/resultsscreen1.png" alt="Final Screen top Screen on Tablet Version" width="500">
<img src="content/resultsscreen2.png" alt="Final Screen Bottom on Tablet Version" width="500">

### Additional Screens
#### The user can then select the "restart the app" button which navigates back to screen one and clears all results or they can select the "View more recommendations" button to view screen 6 with different movie and restaurant results.



## Other features to implement in future versions

[ ] Figure out how to handle edge cases for movie input
<br/>
[ ] Incorporate an additional API that will let the user know which streaming service currently offers their movie selection for viewing.

