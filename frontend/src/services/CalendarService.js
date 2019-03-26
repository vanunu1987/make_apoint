import moment from 'moment';

function getEvents(workHours, today) {
  console.log('get event activated: prop:',workHours)
  var eventList = []
  var days = _getWeekDaysLeft(today)
  days = days.map((day) => _adjustTimeRange(day,workHours))
  days.forEach((day) => {
    eventList.push(..._getDayEvents(day.date, day.timeRanges))
  })
  return eventList
} 




function _getWeekDaysLeft(startDate) {
  var days = []
  var count = 7 - moment(startDate).day()
  for (let i = 0; i < count; i++) {
    var day = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
    days.push(day)
  }
  return days
}

function _adjustTimeRange(date,workHours) {
  var weekDay = moment(date).day()
  var timeRanges = workHours.find((day) =>{
   return day.dayOfTheWeek == weekDay
  }).timeRanges
  return {
    date,
    timeRanges
  }
}

function _getDayEvents(date, timeRanges) {
  var eventList = []
  timeRanges.forEach(function (timeRange) {
    var eventCount = timeRange.to.split(':')[0] - timeRange.from.split(":")[0]
    for (let i = 0; i < eventCount; i++) {
      var time = timeRange.from.split(':')
      time = moment({ hour: time[0], minute: time[1] }).add(i, 'hours').format('HH:mm')
      eventList.push(
        {
          date: date,
          time: time,
          duration: 60
        }
      )
    }
  })
  return eventList
}


export default {
  getEvents: getEvents
}

