/**************************
 * TWITTER SECTION
**************************/

var Twitter = require('twitter');

// GET TWITTER KEYS FROM OUTSIDE FILE
var keys = require("./keys.js");

// SETUP TWITTER KEY FOR CLIENT
var client = new Twitter({
  consumer_key: "" + keys.consumer_key + "",
  consumer_secret: "" + keys.consumer_secret + "",
  access_token_key: "" + keys.access_token_key + "",
  access_token_secret: "" + keys.access_token_secret + ""
});


var input = process.argv[2];
console.log(input);

if (input == "my-tweets") {
  client.get('statuses/home_timeline', function(error, tweets, response) {
    // console.log(tweets);
    for (var i = 0; i < 20; i++){
      for (var key in tweets){
        console.log("---------------------------------");
        console.log("Posted by: " + tweets[key].user.name);
        console.log("Date: " + tweets[key].created_at);
        console.log("Tweet: " + tweets[key].text);
        console.log("---------------------------------");  
      }
    }// end for loop
  });//client.get
}//if input

/**************************
 * SPOTIFY SECTION
**************************/

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: "e78e58e70d0946a29e207d49558331fd",
  secret: "3f9db0fed71c4415a7307566deb0ffac",
});

var nodeArgs = process.argv;
var songName = "";

for (var i = 2; i < nodeArgs.length; i++){
  if (i > 2 && i < nodeArgs.length){
    songName = songName + "+" + nodeArgs[i];
  } else {
    songName += nodeArgs[i];
  }
}




spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, songData) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  for (var key in songData){
    // console.log(songData[key].items);
    var items = songData[key].items;
    for (var key in items) {
      console.log("---------------------------------");
      
      console.log("Artist: " + items[key].artists[key].name);
      console.log("Song Name: " + songName);
      console.log("Album: " + items[key].album.name);
      console.log("Spotify Link: " + items[key].album.href);

      console.log("---------------------------------");
      
      
    }
  }
 
});


var fs = require("fs");
fs.readFile("random.txt", "utf8", function(err, data){
  if(err){
    return console.log(err);
  }

  var output = data.split(",");
  console.log("output: " + output);

});

