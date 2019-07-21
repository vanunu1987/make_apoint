
const API_KEY= 'AIzaSyB_X6Bay_XrtVq2O3S7a4ZdiHyxRCsxXrM&callback'

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
  }
  
  function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

async function getLocationByAddress(address){
    console.log(address);
    const url=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
    const res =await fetch(url)
         const json= await  res.json();
         console.log(json);
        return(json.results[0].geometry.location);
 }


var userLocation = null

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(_showPosition)
    return userLocation
  } else {
   console.log(navigator.geolocation);
  }
}

function _showPosition(position) {
 console.log(position.coords.latitude,position.coords.longitude)
 userLocation =  {lat : position.coords.latitude,lng:position.coords.longitude }
console.log(userLocation);
  
}

export default {
    getFromStorage,
    saveToStorage,
    getLocationByAddress,
    getLocation,
    userLocation

}
  