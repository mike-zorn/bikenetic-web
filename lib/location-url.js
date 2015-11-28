const fs = require('fs')
const path = require('path')

const location = fs.readFileSync(path.join(__dirname, '../content/location'))

module.exports = `http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=${encodeURIComponent(location)}&ie=UTF8&z=13&t=m&iwloc=addr&output=embed`
