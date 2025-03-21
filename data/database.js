const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;


let dbBooks;
let dbReaders;
const initDbBooks = (callback) => {
  if (dbBooks) {
    console.log('Db is already initialized!');
    return callback(null, dbBooks);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      dbBooks = client.db('books'); 
      callback(null, dbBooks);
    })
    .catch((err) => {
      callback(err);
    });
    console.log('MongoDB URI:', process.env.MONGODB_URL)

};

const initDbReaders = (callback) => {
  if (dbReaders) {
    console.log('Db is already initialized!');
    return callback(null, dbReaders);
  }
  MongoClient.connect(process.env.MONGODB_URL_READER)
    .then((client) => {
      dbReaders = client.db('readers'); 
      console.log('MongoDB Readers Connected:', process.env.MONGODB_URL_READER);
      callback(null, dbReaders);
    })
    .catch((err) => {
      callback(err);
    });
    console.log('MongoDB URL:', process.env.MONGODB_URL_READER)

};

const getDatabaseBooks = () => {
  if (!dbBooks)  {
    throw Error('Database not initialized');
  }
  return dbBooks;
};


const getDatabaseReaders = () => {
  if (!dbReaders) {
    throw Error('Database not initialized');
  }
  return dbReaders;
};

module.exports = {
  initDbBooks,
  initDbReaders,
  getDatabaseBooks,
  getDatabaseReaders
};
