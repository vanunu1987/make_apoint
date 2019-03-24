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


// function add(toy) {
//     return mongoService.connect()
//         .then(db => {
//             const collection = db.collection('toys');
//             return collection.insertOne(toy)
//                 .then(result => {
//                     toy._id = result.insertedId;
//                     return toy;
//                 })
//         })
// }

// function remove(toyId) {
//     toyId = new ObjectId(toyId)
//     return mongoService.connect()
//         .then(db => {
//             const collection = db.collection('toys');
//             return collection.remove({ _id: toyId })
//         })
// }

// function update(toy) {
//     toy._id = new ObjectId(toy._id)
//     return mongoService.connect()
//         .then(db => {
//             const collection = db.collection('toys');
//             return collection.updateOne({ _id: toy._id }, { $set: toy })
//                 .then(result => {
//                     return toy;
//                 })
//         })
// }

module.exports = {
    query,
    getById,
    // add,
    // remove,
    // update
}