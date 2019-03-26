import UtilService from './UtilService.js'
import UserService from './UserService.js'
// import axios from 'axios'

import Axios from 'axios';
var axios = Axios.create({
   withCredentials:true
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/business' : '//localhost:3003/business';


async function query(filterBy){
    var filterBy = `?name=${filterBy.name}&locationLat=${filterBy.currUserLocation.lat}&locationLng=${filterBy.currUserLocation.lng}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`;
    console.log(filterBy);
    var res = await axios.get(`${BASE_URL}${filterBy}`)
    var businessList = await res.data
    console.log('list : ',businessList);
    return businessList;
}
async function getImgs(type){
    var filterBy = `?type=${type}`;
    console.log(filterBy);
    var res = await axios.get(`${BASE_URL}/imgs${filterBy}`)
    console.log('gotttttt : ', res.data);
    return res.data
}

async function getById(businessId){
    if (!businessId) return _getEmptyBusiness()
    var res = await axios.get(`${BASE_URL}/${businessId}`)
    var business = await res.data
    console.log(business);
    return business
}

async function add(currBusiness){
    console.log(currBusiness);
    var res = await axios.post(`${BASE_URL}`,currBusiness)
    console.log('GOT NEW BUS : ', res.data);
    var business = await res.data
    return business
}


function _getEmptyBusiness(){
    return {
        "rank": {
            "qty": 0,
            "avg": 0
        },
        "type": "",
        "name": "",
        "phone" : "",
        "userName": "",
        "pass": "",
        "address":"",
        "location": {
            "lat": 32.087971200000005,
            "lng": 34.8031581

        },
        "appoints_id": [],
        "products": [
            {},
            {}
        ],
        "prefs": {
            "description": "",
            "preview_img_url": "",
            "profile_img_url": "",
            "header_img_url": ""
        },
        "workHours": [
            {
                "dayOfTheWeek": 0,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    },
                    {
                        "from": "12:00",
                        "to": " 15:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 1,
                "timeRanges": [
                    {
                        "from": "08:00",
                        "to": " 17:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 2,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 3,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 4,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 5,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 6,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            }
        ]
    }
}



export default {
    query,
    getById,
    add,
    getImgs
}
