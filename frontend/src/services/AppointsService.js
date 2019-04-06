// import axios from 'axios'
import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/appoints' : '//localhost:3003/appoints';



async function query(filterBy) {
    var filterBy = `?listRequire=${filterBy.listRequire}&listRequireId=${filterBy.listRequireId}`
    var res = await axios.get(`${BASE_URL}${filterBy}`)
    var appointsList = await res.data
    return appointsList;
}

async function getBusinessData(businessId) {
    var res = await axios.get(`${BASE_URL}/data/${businessId}`)
    var businessData = await res.data
    return businessData
}

async function add(appoint) {
    var res = await axios.post(`${BASE_URL}`, appoint)
    var appoint = await res.data
    return appoint
}

async function remove(appointId) {
    var res = await axios.delete(`${BASE_URL}/${appointId}`)
    return res
}


export default {
    query,
    getBusinessData,
    add,
    remove
}
