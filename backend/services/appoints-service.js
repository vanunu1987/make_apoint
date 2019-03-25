const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function query(appointsQuery){
    console.log('QUERYYY : ',appointsQuery);
    
    var queryToMongo = {}
    if (appointsQuery.listRequire === 'business') queryToMongo.business_id = appointsQuery.listRequireId
    else queryToMongo.user_id = appointsQuery.listRequireId
    
    // queryToMongo.business_id = new ObjectId(businessId)
    return mongoService.connect()
            .then((db) => {
                return db.collection('appoints').find(queryToMongo).toArray()
            })
}

// function query(businessId){
//     var queryToMongo = {}
//     queryToMongo.business_id = businessId
//     // queryToMongo.business_id = new ObjectId(businessId)
//     return mongoService.connect()
//             .then((db) => {
//                 return db.collection('appoints').find(queryToMongo).toArray()
//             })
// }


// function query(appointsQuery) {
//     const criteria = {}
//     if (appointsQuery.listRequire === 'business') var businessId = appointsQuery.listRequireId
//     else var userId = appointsQuery.listRequireId
//     if (userId) criteria.userId = new ObjectId(userId)
//     if (businessId) criteria.businessId = new ObjectId(businessId)
//     if (appointId) criteria.appointId = new ObjectId(appointId)
//     console.log(criteria.userId);
    
//     return mongoService.connect().then(db => {
//         return db.collection('appoints')
//             .aggregate([
//                 {
//                     $match : criteria
//                 },
//                 {
//                     $lookup:
//                     {
//                         from: 'appoints',
//                         localField: 'userId',
//                         foreignField: 'user_id',
//                         as: 'appoint'
//                     }
//                 },
//                 {
//                     $unwind: '$appoints'
//                 },
//                 {
//                     $lookup:
//                     {
//                         from: 'users',
//                         localField: 'userId',
//                         foreignField: '_id',
//                         as: 'user'
//                     }
//                 },
//                 {
//                     $unwind: '$users'
//                 },
//                 {
//                     $lookup:
//                     {
//                         from: 'business',
//                         localField: 'businessId',
//                         foreignField: '_id',
//                         as: 'business'
//                     }
//                 },
//                 {
//                     $unwind: '$business'
//                 }
//             ]).toArray()
//     })
// }



module.exports = {
    query
}