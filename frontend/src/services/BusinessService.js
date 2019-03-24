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
    console.log('list : ',businessList);
    return businessList;
}

async function getById(businessId){
    if (!businessId) return _getEmptyBusiness()
    var res = await axios.get(`${BASE_URL}/${businessId}`)
    var business = await res.data
    console.log(business);
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
            "preview_img_url": ""
        },
        "cmps": [
            {
                "type": "header_imgs",
                "data": {
                    "img_urls": []
                }
            },
            {
                "type": "profile_img",
                "data": {
                    "img_url": "",
                    "shape": "circle"
                }
            },
            {
                "type": "header_txt",
                "data": {
                    "main_txt": "",
                    "sub_txt": ""
                }
            },
            {
                "type": "desc_txt",
                "data": {
                    "txt" : ""
                }
            }
        ],
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
    getById
}
