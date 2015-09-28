const hours = require('../content/hours.json')

module.exports = hours.map(function (dayHours) {

  return {
    day: dayHours.day,
    hours:
      // TODO use moment to format this correctly
      `${dayHours.hours[0]}-${dayHours.hours[1]}`
  }
})
