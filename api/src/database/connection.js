const mongoose = require('mongoose');
const {
  DBHOST, DBPORT, DBNAME, DBUSER, DBPASSWORD
} = process.env;

const url = `mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}:${DBPORT}/${DBNAME}?authSource=admin`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);

module.exports = mongoose.connection
