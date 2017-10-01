/**************************
 * REQUIRE TWITTER
**************************/

var keys = require("./keys.js");


// GET TERMINAL INPUT
var input = process.argv[2];
var action = process.argv[3];
var nodeArgs = process.argv;

/**************************
 * SPOTIFY SETUP
**************************/
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: "e78e58e70d0946a29e207d49558331fd",
  secret: "3f9db0fed71c4415a7307566deb0ffac",
});

// SPOTIFY VARS
var songName = "";

    
/**************************
 * TWITTER LOGIC
**************************/
if (input == "my-tweets") {
  keys.client.get('statuses/home_timeline', function(error, tweets, response) {
    // console.log(tweets);   
      for (var key in tweets){
        console.log("Posted by: " + tweets[key].user.name);
        console.log("Date: " + tweets[key].created_at);
        console.log("Tweet: " + tweets[key].text);
        console.log("\n-------------\n");
      }   
  });//client.get
  return;
} 

/**************************
 * OMDB LOGIC
**************************/
//OMDB VARS
var request = require("request");
// var nodeArgs = process.argv;
var movieName = "";

if (input === "movie-this" && input != "spotify-this-song" && process.argv[3] != undefined) {
  for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      }
      else {
        movieName += nodeArgs[i];
      }
  }
  movieThis();
} 

if (input === "movie-this" && input != "spotify-this-song" && process.argv[3] === undefined) {
  movieName = "mr+nobody";
  movieThis();
}

function movieThis(){
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body);
      console.log("\n-------------\n");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("\n-------------\n");
    }
  });
}




/**************************
 * SPOTIFY LOGIC
**************************/

if (input = "spotify-this-song" && input != "movie-this" && process.argv[3] != undefined){
  for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length){
      songName = songName + "+" + nodeArgs[i];
    } else {
      songName += nodeArgs[i];
    } 
  }
  spotifyThis();
  } 
  
  if (input = "spotify-this-song" && input != "movie-this" && process.argv[3] === undefined) {
  songName = "The+Sign+Ace+of+Base";
  spotifyThis();
  }

  function spotifyThis(){
    
    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, songData) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
      for (var key in songData){
        // console.log(songData[key].items);
        var items = songData[key].items;
        for (var key in items) {
          console.log("\n-------------\n");
          console.log("Artist: " + items[key].artists[key].name);
          console.log("Song Name: " + items[key].name);
          console.log("Album: " + items[key].album.name);
          console.log("Spotify Link: " + items[key].album.href);
          console.log("\n-------------\n");
        }
      }// key in songData
    });// spotify.search
  }

/**************************
 * SETUP TO READ OUTSIDE FILE
**************************/
  
var fs = require("fs");
if (input === "do-what-it-says" && process.argv[3] === undefined){
  fs.readFile("random.txt", "utf8", function(err, data){
    if(err){
      return console.log(err);
    }
    var output = data.split(",");
    var command = output[0];
    var song = output[1];
    console.log("do nodeargs: " + nodeArgs);

    if (input = "spotify-this-song"){
      songName = song;
      spotifyThis();
    } else if (input === "movie-this"){
      movieThis();
    }
    
    });   
}


