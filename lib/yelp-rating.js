var config = require('../config'),
    _ = require('lodash'),
    Q = require('q'),
    yelp = require("yelp").createClient({
      consumer_key: config.yelp.consumerKey,
      consumer_secret: config.yelp.consumerSecret,
      token: config.yelp.token,
      token_secret: config.yelp.tokenSecret
    }),
    yelpRating;


function setYelpRating() {
  return Q.ninvoke(yelp, 'business', 
    'bikenetic-full-service-bicycle-shop-falls-church').
  then(function(response) {
    console.log('yelp gave:', response[1].statusCode);
    yelpRating = response[0].rating
  }).
  fail(console.log.bind(console, 'error from yelp'));
}

setYelpRating();
setInterval(setYelpRating, 360000);

module.exports = function() {
  return yelpRating;
}
