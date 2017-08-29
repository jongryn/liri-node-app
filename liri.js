/*
// Created: Aug. 22, 2017 5:25 PM
// Author: Jonathan Gryn
// Revisions: Jon (8/22/17) - Added JS
//            Jon (8/23/17) - 
//            Jon (8/28/17) - 
*/

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

// Grab data from key.js
var keys = require('./key.js/');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var client = new twitter(keys.twitterKeys);
var fs = require('fs');

// Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];

// Move or song
var x ="";

// Ataches multiple word arguments
for (var i = 3; i<nodeArgv.length; i++){
    if(i>3 && i<nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

// switch case
switch(command) {
    case "my-tweets":
        showTweets();
    break;

case "spotify-this-song"
if(x) {
    spotifySong(x);
} else {
    spotifySong("Flourescent Adolescent");
}
break;

case "movie-this":
    if(x) {
        omdbData(x)
    } else {
        ombdData("Mr. Nobody");
    }

break;

case "do-what-it-says":
    doThing();
break;

default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
break;
}

function showTweets() {

    // Display last 20 Tweets
    var screenName = {screen_name: 'appleseed_j3'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
        if(!error){
            for(var i = 0; i<tweets.length; i++){
                var date = tweets[i].created_at;
                console.log("@appleseed_j3" + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");

                // Adds tesxt to log.txt file
                fs.appendFile('log.txt', "@appleseed_j3: " + tweets[i].text + "Created At: " + date.substring(0. 19));
                fs.appendFile('log.txt', "-----------------------");
            }
        } else {
            console.log('Error occurred');
        }
    });
}

function spotifySong(song) {
    spotify.search({ type: 'track', query: song}, function(error, data){
        if(!error) {
            for (var i = 0; i < data.tracks.items.length; i++){
                var songData = data.tracks.items[i];

                // Artist
                console.log("Artist: " + songData.artists[0].name);

                // Song name
                console.log("Song: " + songData.preview_url);

                // Album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");

                // Adds text to log.txt
                fs.appendFile('log.txt', songData.artists[0].name);
                fs.appendFile('log.txt', songData.name);
                fs.appendFile('log.txt', songData.preview_url);
                fs.appendFile('log.txt', songData.album.name);
                fs.appendFile('log.txt', "-----------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}

function omdbData(movie) {
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

    request(omdbURL, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tamatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);

            // Adds text to log.txt
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Release Year: " + body.Year);
            fs.appendFile('log.txt', "IMdB Rating: " + body.imbdRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);
            fs.appendFile('log.txt', "Rotten Tamatoes Rating: " + body.tamatoRating);
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tamatoURL);

        } else {
            console.log('Error occurred');
        }
        if(movie === "Mr. Nobody"){
            console.log("-----------------------");
            console.log("If you haven't watch 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

            // Adds text to log.txt
            fs.appendFile('log.txt', "-----------------------");
            fs.appendFile('log.txt', "If you haven't watch 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
        }
    });
}

function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');

        spotifySong(txt[1]);
    });
}