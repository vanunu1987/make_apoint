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


function add(appoint) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('appoints');
            return collection.insertOne(appoint)
                .then(result => {
                    appoint._id = result.insertedId;
                    return appoint;
                })
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

module.exports = {
    query,
    getBusinessData,
    add
}