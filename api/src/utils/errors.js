// Global method to process errors
const {HTTP_SERVER_ERROR} = require("./constants");

exports.processError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = HTTP_SERVER_ERROR;
  }
  next(err);
}
