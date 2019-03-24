import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/appoints' : '//localhost:3003/appoints';


async function query(businessId){
    var res = await axios.get(`${BASE_URL}/${businessId}`)
    var appointsList = await res.data
    console.log(appointsList);
    return appointsList;
}


export default {
    query
}
