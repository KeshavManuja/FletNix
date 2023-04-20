const { MongoClient } = require("mongodb");

const helpers = {
    dbConnection: async (uri, database_name) => {
        try {
            let mongoClient = new MongoClient(uri);
            console.log('Connecting to MongoDB Atlas cluster...');
            await mongoClient.connect();
            console.log('Successfully connected');
            console.log(database_name)
            return await mongoClient.db(database_name);
        } catch (error) {
            console.error('Connection to MongoDB Atlas failed!', error);
            process.exit();
        }
    }
}
module.exports = helpers