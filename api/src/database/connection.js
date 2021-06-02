const mongoose = require('mongoose');

const url = `mongodb://database:27017/posterizer`;
const options = {
  useNewUrlParser: true
};

mongoose.connect(url, options);

module.exports = mongoose.connection
