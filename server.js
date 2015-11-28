const express = require('express')
const app = express()
const hours = require('./lib/hours')
// const yelpRating = require('./lib/yelp-rating')
const facebookAlert = require('./lib/facebook-alert')
const facebookPhotos = require('./lib/facebook-photos')
const locationHtml = require('./lib/location-html')
const locationUrl = require('./lib/location-url')
const svg = require('./svg')
const path = require('path')
const port = process.env.PORT || 2000

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.favicon(path.join(__dirname, '/public/img/favicon.ico')))

app.get('/', function (req, res) {
  res.render('index', {
    alert: facebookAlert(),
    hours: hours,
    locationHtml: locationHtml,
    locationUrl: locationUrl,
    photos: facebookPhotos(),
    starsSvg: 5,// svg.getStarsForRating(yelpRating()),
    yelpSvg: svg.yelp
  })
})

app.listen(port)
console.log('Up & running @', port)
