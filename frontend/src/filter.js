import Vue from 'vue';
console.log('filter.js is connected!')

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })


Vue.filter('dollar', function (value) {
    if (!value||typeof value !== 'number') return value
    value = '$ '+value
    return value
  })


Vue.filter('hours', function (value) {
    if (!value||typeof value !== 'number') return value
    var strHtml =''
   var hours = Math.floor(value/60)
   if(hours) strHtml += `${hours} hours`
   var min = value%60
   if(min) strHtml += `${min} mins`

    return strHtml
  })

