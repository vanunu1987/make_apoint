const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;


function query(filterBy) {
    var queryToMongo = {}
    var id = new ObjectId(filterBy.listRequireId)
    if (filterBy.listRequire === 'business') queryToMongo.business_id = id
    else queryToMongo.user_id = id
    console.log('queryToMongo : ', queryToMongo);
    return mongoService.connect()
    .then(db =>
        db.collection('appoints').aggregate([
            {
                $match: queryToMongo 
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField:'user_id',
                    foreignField: '_id',
                    as: 'userData'
                }
            }, 
            {
                $unwind: '$userData'
            }
        ]).toArray()
    )
}
// function query(filterBy) {
//     var queryToMongo = {}
//     if (filterBy.listRequire === 'business') queryToMongo.business_id = filterBy.listRequireId
//     else queryToMongo.user_id = filterBy.listRequireId
//     console.log('queryToMongo : ', queryToMongo);
//     return mongoService.connect()
//         .then((db) => {
//             return db.collection('appoints').find(queryToMongo).toArray()
//         })
// }


function add(appoint) {
    appoint.user_id = new ObjectId(appoint.user_id)
    appoint.business_id = new ObjectId(appoint.business_id)
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

function remove(appointId) {
    appointId = new ObjectId(appointId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('appoints');
            return collection.remove({
                _id: appointId
            })
        })
}

function getBusinessData(businessId) {
    var queryToMongo = { business_id: new ObjectId(businessId) }

    return mongoService.connect()
        .then((db) => {
            return db.collection('appoints').aggregate(
                    [{
                            $match: queryToMongo
                        },
                        {
                            $group: {
                                _id: "$date",
                                total: {
                                    $sum: "$product.price"
                                },
                                count: {
                                    $sum: 1
                                }
                            }
                        },
                        {
                            $sort: {
                                _id: 1
                            }
                        }
                    ]
                ).toArray()
                .then((res1) => {
                    return db.collection('appoints').aggregate(
                            [{
                                    $match: queryToMongo
                                },
                                {
                                    $group: {
                                        _id: "$product.title",
                                        total: {
                                            $sum: "$product.price"
                                        },
                                        count: {
                                            $sum: 1
                                        }
                                    }
                                },
                                {
                                    $sort: {
                                        _id: 1
                                    }
                                }
                            ]
                        ).toArray()
                        .then((res2) => {
                            return {
                                byDate: res1,
                                byProduct: res2
                            }
                        })
                })

        })

}

module.exports = {
    query,
    getBusinessData,
    add,
    remove
}