var request = require('request'),
    _ = require('lodash'),
    Q = require('q'),
    sprintf = require('sprintf'),
    config = require('../config'),
    alert;

function getAccessToken() {
  var url = sprintf('https://graph.facebook.com/oauth/access_token?' +
        'client_id=%(appId)s&client_secret=%(appSecret)s&' +
        'grant_type=client_credentials', config.facebook);
  return Q.ninvoke(request, 'get', url).
  spread(function(res, body) {
    console.log('facebook oauth', res.statusCode, body);
    return body;
  }, function(err) {
    console.log('facebook oauth', err);
  });
}

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
