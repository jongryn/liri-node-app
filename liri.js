/*
// Created: Aug. 22, 2017 5:25 PM
// Author: Jonathan Gryn
// Revisions: Jon (8/22/17) - Added JS
//            Jon (8/23/17) - Got Spotify API to start responding
//            Jon (8/28/17) - Configured OMDb API to run a function
//            Jon (9/3/17) - Added OMDb API and completed bonus
*/

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var keys = require('./key.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var fs = require('fs');


var getMyTweets = function() {

    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'appleseed_j3'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            // console.log(tweets);
            for(var i=0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });

}

var getAristNames = function(artists) {
    return artists.name;
}

var getMeSpotify = function(songName) {
    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
     id: 'ce37b18a8a67413097271a73cd81576b',
     secret: '93e693706dfa48f7acf1d2fb522f74dd'
    });
    
    spotify.search({ type: 'track', query: songName }, function(err, data) {
     if (err) {
       return console.log('Error occurred: ' + err);
     }

     var songs = data.tracks.items;
     for(var i=0; i<songs.length; i++) {
         console.log(i);
         console.log('artist(s): ' + songs[i].artists.map(
             getAristNames));
             console.log('song name: ' + songs[i].name);
             console.log('preview song: ' + songs[i].preview_url);
             console.log('album: ' + songs[i].album.name);
             console.log('-----------------------------------');
     }
    });
}

var getMeMovie = function(movieName) {

    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName +'&y=&plot=short&r=json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred 

        // Print the response status code if a response was received 
        console.log('statusCode:', response && response.statusCode == 200); {
            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        
        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length ==1) {
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
