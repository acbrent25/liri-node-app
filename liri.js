// GET TWITTER KEYS
var keys = require("./keys.js");

// GET TERMINAL INPUT
var input = process.argv[2];
var action = process.argv[3];
action = undefined;
var nodeArgs = process.argv;

//OMDB VARS
var request = require("request");
// var nodeArgs = process.argv;
var movieName = "";

// SPOTIFY VARS
var songName;
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: "e78e58e70d0946a29e207d49558331fd",
  secret: "3f9db0fed71c4415a7307566deb0ffac",
});


/**************************
 * RUN FUNCTIONS
**************************/
if (input === "my-tweets"){
  tweetThis();
} 

if (input === "movie-this") {
  movieThis();
} 

if(input === "movie-this" && process.argv[3] === undefined){
  movieName = "mr+nobody";
  movieThis();
  return;
}

if(input === "spotify-this-song"){
  spotifyThis();
} 



if (input === "do-what-it-says"){
  whatItSays();
} 


/**************************
 * TWITTER LOGIC
**************************/
 function tweetThis (){
  keys.client.get('statuses/home_timeline', function(error, tweets, response) {
     console.log(tweets);   
      for (var key in tweets){
        console.log("Posted by: " + tweets[key].user.name);
        console.log("Date: " + tweets[key].created_at);
        console.log("Tweet: " + tweets[key].text);
        console.log("\n-------------\n");
      }   
  });//client.get
} 

/**************************
 * OMDB LOGIC
**************************/

function movieThis() {
  for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      }
      else {
        movieName += nodeArgs[i];
      }
  }


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

  function spotifyThis(){
    
    for (var i = 3; i < nodeArgs.length; i++){
      if (i > 3 && i < nodeArgs.length){
        songName = songName + "+" + nodeArgs[i];
      } else {
        songName += nodeArgs[i];
      } 
    }

    if (input === "spotify-this-song" && action === undefined) {
      songName = "the+sign";
    }

    console.log("song name; " + songName);
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



function whatItSays() {
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function (error, data) {  
      var dataArr = data.split(',')
      input = dataArr[0];
      songName = dataArr[1];
      for (var i = 2; i < dataArr.length; i++) {
          songName = songName + "+"
          dataArr[i];
          
      };
      spotifyThis();
  });
}











