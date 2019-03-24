const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function query(businessId){
    var queryToMongo = {}
    queryToMongo.business_id = businessId
    // queryToMongo.business_id = new ObjectId(businessId)
    return mongoService.connect()
            .then((db) => {
                return db.collection('appoints').find(queryToMongo).toArray()
            })
}


module.exports = {
    query
}