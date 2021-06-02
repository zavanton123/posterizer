const mongoose = require('mongoose');

const url = 'mongodb://zavanton:21665mylife@localhost:27017/posterizer?authSource=admin';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);

module.exports = mongoose.connection
