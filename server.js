var express = require('express'),
    app = express(),
    yelpRating = require('./lib/yelp-rating'),
    facebookAlert = require('./lib/facebook-alert'),
    svg = require('./svg'),
    port = process.env.PORT || 2000;

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + "/public"));
app.use(express.favicon(__dirname +"/public/img/favicon.ico"));

app.get('/', function(req, res) {
  res.render('index', {
    yelpSvg: svg.yelp,
    starsSvg: svg.getStarsForRating(yelpRating()),
    alert: facebookAlert()
  });
});

if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'bikenetic-web'
  });
}

app.listen(port);
console.log('Up & running @', port);
