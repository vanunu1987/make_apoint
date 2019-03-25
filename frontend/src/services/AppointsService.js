// import axios from 'axios'
import Axios from 'axios';
var axios = Axios.create({
   withCredentials:true
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/appoints' : '//localhost:3003/appoints';



async function query(listRequireId){
    console.log('ID : ',listRequireId);
    var res = await axios.get(`${BASE_URL}/${listRequireId}`)
    var appointsList = await res.data
    console.log(appointsList);
    return appointsList;
}


export default {
    query
}
