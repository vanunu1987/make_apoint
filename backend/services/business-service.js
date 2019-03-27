const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('business').findOne({ _id }))
}



function query(filterBy) {
    if (!filterBy) {
        return mongoService.connect()
            .then(db => db.collection('business').find({}).toArray())
    } else {
        var queryToMongo = {}
        var name = filterBy.name
        var type = filterBy.type
        var reg = new RegExp(name,'i')
        if (name) queryToMongo.name = { '$regex': reg }
        if (type) queryToMongo.type = { '$regex': reg }
        queryToMongo = { $or: [ { name: { '$regex': reg } }, {type: { '$regex': reg }} ] }
        console.log('QUERY : ',queryToMongo);
        return mongoService.connect()
            .then((db) => {
                return db.collection('business').find(queryToMongo).toArray()
                // return db.collection('business').find(queryToMongo).sort({sortBy:1}).toArray()
            })
    }
}

function getImgs(filterBy){
    var type = filterBy.type
    var queryToMongo = {type:filterBy.type}
    // console.log(queryToMongo);
    console.log(type);
    
    return mongoService.connect()
            .then((db) => {
                return db.collection('imgs').find(queryToMongo).toArray()
            })

}


function add(business) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('business');
            return collection.insertOne(business)
                .then(result => {
                    business._id = result.insertedId;
                    return business;
                })
        })
}

// function remove(toyId) {
//     toyId = new ObjectId(toyId)
//     return mongoService.connect()
//         .then(db => {
//             const collection = db.collection('toys');
//             return collection.remove({ _id: toyId })
//         })
// }

function update(business) {
    business._id = new ObjectId(business._id)
    console.log('BACKEND SERVICE : ',business.location);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('business');
            return collection.updateOne({ _id: business._id }, { $set: business })
                .then(result => {
                    return business;
                })
        })
}

module.exports = {
    query,
    getById,
    add,
    getImgs,
    // remove,
    update
}