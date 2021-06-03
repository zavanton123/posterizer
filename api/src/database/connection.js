const mongoose = require('mongoose');
const {
  DBPORT, DBNAME
} = process.env;

const url = `mongodb://database:${DBPORT}/${DBNAME}`;
console.log(`zavanton - url: ${url}`);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);

module.exports = mongoose.connection
