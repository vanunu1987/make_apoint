// import axios from 'axios'
import Axios from 'axios';
var axios = Axios.create({
   withCredentials:true
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/appoints' : '//localhost:3003/appoints';



async function query(filterBy){
    console.log('FILTER :  : ',filterBy);
    var filterBy = `?listRequire=${filterBy.listRequire}&listRequireId=${filterBy.listRequireId}`
    var res = await axios.get(`${BASE_URL}${filterBy}`)
    var appointsList = await res.data
    console.log(appointsList);
    return appointsList;
}


// async function query(filterBy){
//     var filterBy = `?name=${filterBy.name}&locationLat=${filterBy.currUserLocation.lat}&locationLng=${filterBy.currUserLocation.lng}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`;
//     console.log(filterBy);
//     var res = await axios.get(`${BASE_URL}${filterBy}`)
//     var businessList = await res.data
//     console.log('list : ',businessList);
//     return businessList;
// }

async function getBusinessData(businessId){
    console.log('service id : ',businessId);
    var res = await axios.get(`${BASE_URL}/data/${businessId}`)
    var businessData = await res.data
    console.log('GOT THIS : ',businessData);
    return businessData
}


export default {
    query,
    getBusinessData
}
