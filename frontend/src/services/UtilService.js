
const API_KEY= 'AIzaSyB_X6Bay_XrtVq2O3S7a4ZdiHyxRCsxXrM&callback'
function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
  }
  
  function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

async function getLocationByAdrres(adrres){
    console.log(adrres);
    const url=`https://maps.googleapis.com/maps/api/geocode/json?address=${adrres}&key=${API_KEY}`
    const res =await fetch(url)
         const json= await  res.json();
         console.log(json);
         
        return(json.results[0].geometry.location);
 }

export default {
    getFromStorage,
    saveToStorage,
    getLocationByAdrres

}
  