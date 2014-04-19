var request = require('request'),
    Q = require('q'),
    sprintf = require('sprintf'),
    config = require('../config');

module.exports = function() {
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
};
