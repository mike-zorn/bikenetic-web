var fs = require('fs'),
    stars = {
      '5': fs.readFileSync(__dirname+'/5-stars.svg'),
      '4.5': fs.readFileSync(__dirname+'/4-5-stars.svg'),
      '4': fs.readFileSync(__dirname+'/4-stars.svg'),
      '3.5': fs.readFileSync(__dirname+'/3-5-stars.svg'),
      '3': fs.readFileSync(__dirname+'/3-stars.svg')
    };

module.exports = {
  yelp: fs.readFileSync(__dirname+'/yelp.svg'),
  getStarsForRating: function(rating) {
    return stars[rating] || '';
  }
}
