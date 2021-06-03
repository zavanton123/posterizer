// Global method to process errors
exports.processError = (err, next)  =>  {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}
