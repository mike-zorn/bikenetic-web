var request = require('request'),
    _ = require('lodash'),
    Q = require('q'),
    getAccessToken = require('./facebook-access-token'),
    alert;

function getAlert(token) {
  var url = 'https://graph.facebook.com/109198659188571/posts?' +
        'fields=message&since=yesterday&' + token
  return Q.ninvoke(request, 'get', url).
  spread(function(res, body) {
    console.log('facebook messages', res.statusCode, body);
    return JSON.parse(body).data;
  }, function(err) {
    console.log('facebook messages', err);
  }).
  then(function(messages) {
    return _(messages).
    pluck('message').
    filter(function(message) {
      return message && message.match(/#alert/i)
    }).
    head();
  });
}

function setAlert() {
  getAccessToken().
  then(getAlert).
  then(function(newAlert) {
    console.log('newAlert', newAlert);
    alert = newAlert;
  }).
  catch(console.error);
}

setAlert();
setInterval(setAlert, 360000);

module.exports = function() {
  return alert;
};
