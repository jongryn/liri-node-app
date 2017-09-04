/*
// Created: Aug. 22, 2017 5:25 PM
// Author: Jonathan Gryn
// Revisions: Jon (8/22/17) - Added JS
//            Jon (8/23/17) - Added Twitter keys
//            Jon (8/28/17) - Added Spotify keys
*/

console.log('this is loaded');

// Get your API creds by following these steps:
// Step One: https://apps.twitter.com/app/new
// Step Two: use http:// for your urls
// Step Three: then go to Keys and Access Tokens to get your credentials for below
// Step Four: then you have to click the button below on that page to create an access token
exports.twitterKeys = {
  consumer_key: '8b9PRKmbIhvdMdmcXNTFanBBs',
  consumer_secret: 'GQaUEjwPQfy4RslJZT2R4Uj3T3xCaE9cZVQ0N8wPJ0EssfP5OK',
  access_token_key: '902324044724281345-31BV1y2bn8U9mquVVF30lcap7bytDtP',
  access_token_secret: 'mbmHcQGROUij4HSDnWA9H3Ae0MXD2dsW5JzHkh8qOb48V',
}

// Request
// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });

// // Twitter npm
// var Twitter = require('twitter');

// var client = new Twitter({
//  consumer_key: '',
//  consumer_secret: '',
//  access_token_key: '',
//  access_token_secret: ''
// });

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//  if (!error) {
//    console.log(tweets);
//  }
// });

// // Spotify npm
// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//  id: <your spotify client id>,
//  secret: <your spotify client secret>
// });

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//  if (err) {
//    return console.log('Error occurred: ' + err);
//  }

// console.log(data); 
// });

// // 
// console.log('this is loaded');

// exports.twitterKeys = {
//   consumer_key: '<input here>',
//   consumer_secret: '<input here>',
//   access_token_key: '<input here>',
//   access_token_secret: '<input here>',
// }

