/**************************
 * TWITTER SETUP
**************************/

var Twitter = require('twitter');
var keys = require("./keys.js");

// SETUP TWITTER KEY FOR CLIENT
var client = new Twitter({
  consumer_key: "" + keys.consumer_key + "",
  consumer_secret: "" + keys.consumer_secret + "",
  access_token_key: "" + keys.access_token_key + "",
  access_token_secret: "" + keys.access_token_secret + ""
});

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
//OMDB VARS
var movieName = "";
var request = require("request");
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

/**************************
 * SETUP TO READ OUTSIDE FILE
**************************/
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(err, data){
    if(err){
      return console.log(err);
    }
    var output = data.split(",");
    console.log("output: " + output[1]);
    var newOutput = output[1];
    emptyArg(newOutput);
    });

    function emptyArg(newOutput){
      console.log("new output: " + newOutput);
    }
    
/**************************
 * TWITTER LOGIC
**************************/
if (input == "my-tweets") {
  client.get('statuses/home_timeline', function(error, tweets, response) {
    // console.log(tweets);   
      for (var key in tweets){
        console.log("---------------------------------");
        console.log("Posted by: " + tweets[key].user.name);
        console.log("Date: " + tweets[key].created_at);
        console.log("Tweet: " + tweets[key].text);
        console.log("---------------------------------");  
      }   
  });//client.get

/**************************
 * SPOTIFY LOGIC
**************************/
// } else if (input = "spotify-this-song"){
//   for (var i = 3; i < nodeArgs.length; i++){
//     if (i > 3 && i < nodeArgs.length){
//       songName = songName + "+" + nodeArgs[i];
//     } else {
//       songName += nodeArgs[i];
//     } 
//   }
//     spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, songData) {
//       if (err) {
//         return console.log('Error occurred: ' + err);
//       }
    
//       for (var key in songData){
//         // console.log(songData[key].items);
//         var items = songData[key].items;
//         for (var key in items) {
//           console.log("\r---------------------------------\r");
//           console.log("Artist: " + items[key].artists[key].name);
//           console.log("Song Name: " + items[key].name);
//           console.log("Album: " + items[key].album.name);
//           console.log("Spotify Link: " + items[key].album.href);
//           console.log("---------------------------------");
//         }
//       }// key in songData
//     });// spotify.search

/**************************
 * OMDB LOGIC
**************************/
} else if (input === "movie-this") {
  for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      }
      else {
        movieName += nodeArgs[i];
      }
    }



console.log(queryUrl);
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body);
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});

}

