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

function addUser(credentials) {
    var user = {}
    user.isReg = credentials.isReg
    user.pass = credentials.password
    user.userName = credentials.userName
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

function query(filterBy) {
    // var queryToMongo = {}
    // queryToMongo.user_id = filterBy
    const _id = new ObjectId(filterBy)
    // console.log('queryToMongo : ', queryToMongo);
    return mongoService.connect()
        .then((db) => {
            return db.collection('users').findOne({_id})
        })
}

module.exports = {
    update,
    addUser,
    checkLogin,
    query
}