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

var fs = require("fs");
fs.readFile("random.txt", "utf8", function(err, data){
  if(err){
    return console.log(err);
  }

  var output = data.split(",");
  console.log("output: " + output);

});

