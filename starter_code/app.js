var SpotifyWebApi = require('spotify-web-api-node');

const express = require('express');
const app = express();
const hbs = require('hbs');
const path= require('path');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')));

// Remember to paste your credentials here
var clientId = '3369f0eac8774e56b4f9a30ae269a041',
    clientSecret = '3c86188f0b504ad391456338637d804b';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

app.get('/',(req,res)=>{
  res.render('home');
})


app.listen(3000);