var config = require('./config'),
    _ = require('lodash'),
    Q = require('q'),
    yelp = require("yelp").createClient({
      consumer_key: config.yelp.consumerKey,
      consumer_secret: config.yelp.consumerSecret,
      token: config.yelp.token,
      token_secret: config.yelp.tokenSecret
    }),
    yelpRating;


function createInfiniteYelpPromise() {
  return Q.ninvoke(yelp, 'business', 
    'bikenetic-full-service-bicycle-shop-falls-church').
  then(function(response) {
    console.log('yelp gave:', response);
    yelpRating = response[0].rating
  }).
  fail(console.log.bind(console, 'error from yelp')).
  delay(360000). //check every hour
  then(createInfiniteYelpPromise);
}

createInfiniteYelpPromise();

module.exports = function() {
  return yelpRating;
}
