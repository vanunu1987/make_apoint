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

async function getBusinessData(businessId){
    console.log('service id : ',businessId);
    var res = await axios.get(`${BASE_URL}/data/${businessId}`)
    var businessData = await res.data
    console.log('GOT THIS : ',businessData);
    return businessData
}

async function add(appoint) {
    console.log(appoint);
    var res = await axios.post(`${BASE_URL}`,appoints)
    console.log('GOT NEW appoint : ', res.data);
    var appoint = await res.data
    return appoint

}


export default {
    query,
    getBusinessData,
    add
}
