var SpotifyWebApi = require('spotify-web-api-node');

const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

// Remember to paste your credentials here
var clientId = '3369f0eac8774e56b4f9a30ae269a041',
    clientSecret = '3c86188f0b504ad391456338637d804b';

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });

app.get('/', (req, res) => {
    res.render('home');
});



app.get('/artists', (req, res) => {
    // console.log(req.body);
    spotifyApi.searchArtists(req.query.artist)
        .then(data => {
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.render('artists', { data });
        })
        .catch(err => {
            // ----> 'HERE WE CAPTURE THE ERROR'
        })

});



app.get('/albums/:artistId', (req, res) => {
    console.log(req.params.artistId);
    spotifyApi.getArtistAlbums(req.params.artistId)
        .then(data => {
            console.log(data);
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.render('album', data.body.items);
        })
        .catch(err => {
            // ----> 'HERE WE CAPTURE THE ERROR'
        })

});

app.get('/art', (req, res) => {
    // console.log(req.body);
    spotifyApi.getArtistAlbums('13ubrt8QOOCPljQ2FL1Kca')
        .then(data => {
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.json(data);
        })
        .catch(err => {
            // ----> 'HERE WE CAPTURE THE ERROR'
        })

});



app.listen(3000);