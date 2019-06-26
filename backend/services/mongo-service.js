var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
   
    
    const url = 'mongodb+srv://IshayMaya:As_123123@cluster0-mk4id.mongodb.net/appointDB?retryWrites=true'
    
    
    // const url = (!process.env.PORT)? 
    //                 'mongodb://localhost:27017/toyDB' : 'mongodb+srv://IshayMaya:<password>@cluster0-mk4id.mongodb.net/test?retryWrites=true'
    
    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
