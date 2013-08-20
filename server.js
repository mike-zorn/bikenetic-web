var express = require('express'),
    app = express(),
    port = process.env.PORT || 2000;

app.use(express.static(__dirname + "/public"));
app.use(express.favicon(__dirname +"/public/img/favicon.ico"));

app.listen(port);
console.log('Up & running @', port);
