const mongoose = require('mongoose');
const {
  DBHOST, DBPORT, DBNAME, DBUSER, DBPASSWORD
} = process.env;

const url = `mongodb://database:27017/posterizer`;
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

mongoose.connect(url, options);

module.exports = mongoose.connection
