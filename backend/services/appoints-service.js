const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function query(filterBy) {
    var queryToMongo = {}
    console.log('FILTER : ',filterBy);
    console.log('REQUIRE : ',filterBy.listRequire);
    if (filterBy.listRequire === 'business') queryToMongo.business_id = filterBy.listRequireId
    else queryToMongo.user_id = filterBy.listRequireId
    console.log('queryToMongo : ', queryToMongo);
    return mongoService.connect()
        .then((db) => {
            return db.collection('appoints').find(queryToMongo).toArray()
        })
}
// function queryAll(appointsQuery) {
//     var queryToMongo = {}
//     if (appointsQuery.listRequire === 'business') queryToMongo.business_id = appointsQuery.listRequireId
//     else queryToMongo.user_id = appointsQuery.listRequireId
//     return mongoService.connect()
//         .then((db) => {
//             return db.collection('appoints').find(queryToMongo).toArray()
//         })
// }

function getBusinessData(businessId) {
    var queryToMongo = { business_id: businessId }
    return mongoService.connect()
        .then((db) => {
            return db.collection('appoints').aggregate(
                [
                    { $match: queryToMongo },
                    { $group: { _id: "$date", total: { $sum: "$product.price" }, count: { $sum: 1 } } },
                    { $sort: { _id: 1 } }
                ]
            ).toArray()
                .then((res1) => {
                    return db.collection('appoints').aggregate(
                        [
                            { $match: queryToMongo },
                            { $group: { _id: "$product.title", total: { $sum: "$product.price" }, count: { $sum: 1 } } },
                            { $sort: { _id: 1 } }
                        ]
                    ).toArray()
                        .then((res2) => {
                            return { byDate: res1, byProduct: res2 }
                        })
                })

        })

}
// function getBusinessData(businessId){
//     var queryToMongo = {business_id:businessId}
//     return mongoService.connect()
//             .then((db) => {
//                 return db.collection('appoints').aggregate(
//                     [
//                         {$match:queryToMongo},
//                         {$group:{_id:"$date",total:{$sum:"$product.price"},count: { $sum: 1 }}},
//                         {$sort:{_id:1}}
//                     ]
//                 ).toArray()
//                 .then((res) => {
//                     return {byDate : res, byProduct:  db.collection('appoints').aggregate(
//                         [
//                             {$match:queryToMongo},
//                             {$group:{_id:"$date",total:{$sum:"$product.price"},count: { $sum: 1 }}},
//                             {$sort:{_id:1}}
//                         ]
//                         ).toArray()}
//                     })

//             })

// }
// function query(businessId){
//     var queryToMongo = {}
//     queryToMongo.business_id = businessId
//     // queryToMongo.business_id = new ObjectId(businessId)
//     return mongoService.connect()
//             .then((db) => {
//                 return db.collection('appoints').find(queryToMongo).toArray()
//             })
// }


module.exports = {
    query,
    getBusinessData
}