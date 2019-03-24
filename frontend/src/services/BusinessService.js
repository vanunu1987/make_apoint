import UtilService from './UtilService.js'
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/business' : '//localhost:3003/business';


async function query(filterBy){
    // if (!filterBy) filterBy = ''
    // else filterBy = `?name=${filterBy.name}&sortBy=${filterBy.sortBy}`;
    var filterBy = `?name=${filterBy.name}&locationLat=${filterBy.currUserLocation.lat}&locationLng=${filterBy.currUserLocation.lng}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`;
    console.log(filterBy);
    
    var res = await axios.get(`${BASE_URL}${filterBy}`)
    var businessList = await res.data
    return businessList;
}

async function getById(businessId){
    var res = await axios.get(`${BASE_URL}/${businessId}`)
    var business = await res.data
    console.log(business);
    return business
}

//  function getById(businessId){
     
//    var res= gBusiness.find((business)=>{
//         return business._id===(businessId)
//     })
//     return Promise.resolve(res)

// }



export default {
    query,
    getById
}
