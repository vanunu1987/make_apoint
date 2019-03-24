
import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/user' : '//localhost:3003/user';


async function checkLogin(credentials){
   var res = await axios.put(`${BASE_URL}/login`,credentials)
   console.log(res.data);
}


export default {
    checkLogin
}
