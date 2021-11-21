const { MongoClient } = require('mongodb');
const config = process.env

const username = encodeURIComponent(config.mongo_dbCompanies_user);
const password = encodeURIComponent(config.mongo_dbCompanies_pass);
const dbHost = config.mongo_dbCompanies_host;
const dbNameCompanies = config.mongo_dbCompanies_dbName;
const dbCollectionCompanies = config.mongo_dbCompanies_collectionName;

const authMechanism = 'DEFAULT';
const qString = `retryWrites=true&w=majority&authMechanism=${authMechanism}`;

const uri = `mongodb+srv://${username}:${password}@${dbHost}/?${qString}`;

const mongoOptions = {
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var _db;

function connectDb() {
	MongoClient.connect(uri, (err, client) => {
         if (err) return console.error(err)
         console.log('Connected to Database')
		 _db = client.db(dbNameCompanies)
})
};

function getDb() {
	console.log(_db + " in database")
    return _db;
  };

module.exports = {
   getDb,
   connectDb
};