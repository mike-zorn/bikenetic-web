const fs = require('fs')
const path = require('path')

const location = fs.readFileSync(path.join(__dirname, '../content/location'))

module.exports = location.toString().replace('\n', '<br>')
