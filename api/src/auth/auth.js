const jwt = require('jsonwebtoken');
const {HTTP_SERVER_ERROR, HTTP_NOT_AUTHENTICATED, AUTHORIZATION_HEADER} = require("../utils/constants");
const {APP_SECRET} = process.env;

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get(AUTHORIZATION_HEADER);
  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = HTTP_NOT_AUTHENTICATED;
    throw error;
  }

  // Authorization: Bearer some-token-here
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, APP_SECRET);
  } catch (err) {
    err.statusCode = HTTP_SERVER_ERROR;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = HTTP_NOT_AUTHENTICATED;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  req.email = decodedToken.email;
  next();
}
