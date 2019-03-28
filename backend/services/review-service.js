const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


module.exports = {
    query,
    getUserReviews,
    addReview
}