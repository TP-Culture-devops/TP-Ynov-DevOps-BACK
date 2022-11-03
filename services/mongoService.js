const {MongoClient} = require("mongodb")

let files,db;

const connectToCluster = async (uri) => {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

async function executeFilesCrudOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;

    
        mongoClient = await connectToCluster(uri);
        db = mongoClient.db('devops_db');
        files = db.collection('files');

        return files
    
}

module.exports = {
    executeFilesCrudOperations,
    connectToCluster
}