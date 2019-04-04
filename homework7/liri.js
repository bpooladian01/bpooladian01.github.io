
//Listing all the packages I'm using
require("dotenv").config();
var inquirer = require("inquirer");
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//
var logFile = "./log.txt";
// Function to write out log file and console.log data
function writeLog(data) {
    console.log(data + "\n");
    fs.appendFileSync(logFile, data + "\n\n");
}

// var userChoice = process.argv[2];
// var searchTerm = process.argv.slice(3).join(" ");
inquirer.prompt([
  {
    type: "list",
    message: "What you like to do?",
    choices: ["concert-this", "movie-this", "spotify-this-song", "do-what-it-says"],
    name: "userChoice"
  },
  {
    type: "input",
    message: "Please list your movie, song or band",
    name: "searchTerm"
  }
]).then(function(inquirerResponse){
  userChoice = inquirerResponse.userChoice;
  searchTerm = inquirerResponse.searchTerm;
  // console.log(userChoice);
  // console.log(searchTerm);
  switchChoices();
})
//This is what gets the program going after the user has picked their choices.
//Switch statement
function switchChoices() {
  switch (userChoice) {
    case "concert-this":
      concertThis();
      break;
    case "spotify-this-song":
      spotifyThisSong()
      break;
    case "movie-this":
      movieThis()
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("command not found");
  }
}
//This get's run if the userChoice is "concert-this" in the switchChoices function
function concertThis() {
  //Need to take searchTerm and input into the queryUrl to access the API
  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function (response) {
      // Should let user know if there are no results
      if (!response.data.length) {
        console.log("No upcoming concerts :(")
      }
      // Need to log name of venue, venue location, date of event (MM/DD/YYYY)
      for (var i = 0; i < response.data.length; i++) {
        //create variable for reponse.data[i]
        console.log(response.data[i].venue.name, response.data[i].venue.city, response.data[i].venue.region, response.data[i].venue.country);
        console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
      }
    }
  );
}
//This get's run if the userChoice is "movie-this" in the switchChoices function
function movieThis() {
  axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Ratings[0]);
      console.log(response.data.Ratings[1]);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);
    }
  )
}
//This get's run if the userChoice is "spotify-this-song" in the switchChoices function
function spotifyThisSong() {
  spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log(data.tracks.items[0].album.name);
  });
}
//This get's run if the userChoice is "do-what-it-says" in the switchChoices function
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log("There was an error");
    }
    console.log(data.split(","));
    var command = data.split(",")
    userChoice = command[0];
    searchTerm = command[1];
    switchChoices();
  })
}
//Originally I ran this function here before I used inquirer, now it's run in the then function in inquirer
// switchChoices();
