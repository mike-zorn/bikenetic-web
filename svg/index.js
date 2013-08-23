var fs = require('fs'),
    stars = {
      stars5: fs.readFileSync(__dirname+'/5-stars.svg'),
      stars45: fs.readFileSync(__dirname+'/4-5-stars.svg'),
      stars4: fs.readFileSync(__dirname+'/4-stars.svg'),
      stars35: fs.readFileSync(__dirname+'/3-5-stars.svg'),
      stars3: fs.readFileSync(__dirname+'/3-stars.svg')
    };

module.exports = {
  yelp: fs.readFileSync(__dirname+'/yelp.svg'),
  getStarsForRating: function(rating) {
    console.log(rating);
    if(rating === 5) {
      return stars.stars5;
    } else if(rating === 4.5) {
      return stars.stars45;
    } else if(rating === 4) {
      return stars.stars4;
    } else if(rating === 3.5) {
      return stars.stars35;
    } else if(rating === 3) {
      return stars.stars3;
    } else {
      return '';
    }
  }
}
