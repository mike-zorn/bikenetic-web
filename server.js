var express = require('express'),
    app = express(),
    port = process.env.PORT || 2000;

app.use(express.static(__dirname + "/public"));
app.use(express.favicon(__dirname +"/public/img/favicon.ico"));

if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'bikenetic-web'
  });
}
app.listen(port);
console.log('Up & running @', port);
