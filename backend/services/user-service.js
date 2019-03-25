const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin(credentials) {
    console.log('service:',credentials);
    var queryToMongo = {}
    queryToMongo.userName = credentials.userName
    queryToMongo.pass = credentials.password
        return mongoService.connect()
        .then(db => db.collection('users').findOne(queryToMongo))
}

// todo  - add user only if nickname is not taken
function addUser(credentials) {
    // var user = { credentials }
    var user = {}
    user.isReg = true
    user.pass = credentials.password
    user.userName = credentials.userName
    user.appoints_id = []
    user.phone = credentials.phone
    user.business_id = null
    return mongoService.connect()
        .then(db => db.collection('users').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}

function update(user) {
    user._id = new ObjectId(user._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('users');
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(result => {
                    return user;
                })
        })
}

// function getById(id) {
//     const _id = new ObjectId(id)
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ _id }))
// }



// function query() {
//     return mongoService.connect()
//         .then(db => db.collection('toys').find({}).toArray())
// }









module.exports = {
    // query,
    // getById,
    update,
    addUser,
    checkLogin
}