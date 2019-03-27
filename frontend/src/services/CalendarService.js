import moment from 'moment';

// function getEvents(workHours, today,appoints) {
//   console.log('get event activated: prop:',workHours)
//   var eventList = []
//   var days = _getWeekDaysLeft(today)
//   days = days.map((day) => _adjustTimeRange(day,workHours))
//   days.forEach((day) => {
//     eventList.push(..._getDayEvents(day.date, day.timeRanges))
//   })
//   return eventList
// } 
var dayEvents = [{date: "2012-09-09", time: "10:00", duration: 60}
,{date: "2012-09-09", time: "11:00", duration: 60}
,{date: "2012-09-09", time: "13:00", duration: 60}]
var dayAppoints = [{date: "2012-09-09", time: "10:00", duration: 60}
,{date: "2012-09-09", time: "13:00", duration: 60}]

function getDayEventsForCalendar(date,workHours,appoints){
var day = _adjustTimeRange(date,workHours)
var dayAppoints = getDayAppoints(date,appoints)
var dayEvents = getDayEvents(date, day.timeRanges)
var availableDayEvents = getAvailableDayEvents(dayEvents,dayAppoints)
return availableDayEvents
}


function getAvailableDayEvents(dayEvents,dayAppoints){
 return dayEvents.filter((event)=>{
  return !dayAppoints.find((appoint)=>{return appoint.time === event.time})
  })
}


function getDayAppoints(date,appoints){
return appoints.filter((appoint)=>appoint.date === date)
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

function getDayEvents(date, timeRanges) {
  var eventList = []
  if(!Array.isArray(timeRanges)) timeRanges = [timeRanges]
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
  // getEvents: getEvents,
  // getDayEvents
  getDayEventsForCalendar
}

