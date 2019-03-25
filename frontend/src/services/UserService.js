
// import axios from 'axios'
import Axios from 'axios';
var axios = Axios.create({
   withCredentials:true
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/user' : '//localhost:3003/user';


async function checkLogin(credentials){
   var res = await axios.put(`${BASE_URL}/login`,credentials)
   console.log(res.data);
   return res.data
}
async function signUpUser(credentials){
   var res = await axios.post(`${BASE_URL}/signup`,credentials)
   console.log('signed: ',res.data);
   return res.data
}
async function updateUser(user){
   var res = await axios.put(`${BASE_URL}/${user._id}`,user)
   console.log('UPDATED : ', res.data);
   return res.data
   
}


export default {
    checkLogin,
    signUpUser,
    updateUser
}
