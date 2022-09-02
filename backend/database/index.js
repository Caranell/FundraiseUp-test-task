const { MongoClient } = require('mongodb');

const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb://localhost:27017';
const DB_NAME = 'UserActivity';

let dbConnection;
const client = new MongoClient(CONNECTION_URL, {
  useUnifiedTopology: true,
});

module.exports = {
  connectToDB: async () => {
    const connection = await client.connect();
    dbConnection = connection.db(DB_NAME);
    console.log('conn');
    // console.log('db', db)
    return client;
  },
  getDbConnection: () => dbConnection,
};
