const {MongoClient} = require("mongodb")

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

const executeStudentCrudOperations = async () => {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
    } finally {
        await mongoClient.close();
    }
}

module.exports = {
    executeStudentCrudOperations,
    connectToCluster
}