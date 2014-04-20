var Q = require('q'),
    _ = require('lodash'),
    accessToken = require('./facebook-access-token'),
    request = require('request'),
    
    photos;

function getPhotos(token) {
  var url = 'https://graph.facebook.com/134155870026183/photos?' +
      'fields=name,images&' + token;
  return Q.ninvoke(request, 'get', url).
  spread(function(res, body) {
    console.log('facebook photos', res.statusCode, body);
    return JSON.parse(body).data;
  }, function(err) {
    console.error('facebook photos', err);
  }).
  then(function(photos) {
    return _(photos).
    map(function(photo) {
      var image = _.max(photo.images,
      function(image) {
        return image.height * image.width;
      });
      return {
        caption: photo.name,
        image: image.source
      };
    }).
    filter(function(photo) {
      return photo.image;
    }).
    head() || {
      image: 'http://sphotos-f.ak.fbcdn.net/hphotos-ak-ash4/'+
        '466076_379895285452239_555699419_o.jpg',
      caption: 'ROBOT RIDE'
    };
  });
}

function setPhotos() {
  accessToken().
  then(getPhotos).
  then(function(newPhotos) {
    console.log('new photos', newPhotos);
    photos = newPhotos;
  })
}

setPhotos();
setInterval(setPhotos, 360000);

module.exports = function() {
  return photos;
}
