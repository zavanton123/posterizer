const jwt = require('jsonwebtoken');
const {HTTP_SERVER_ERROR, HTTP_NOT_AUTHENTICATED, AUTHORIZATION_HEADER} = require("../utils/constants");
const {APP_SECRET} = process.env;

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get(AUTHORIZATION_HEADER);
  console.log(`zavanton - authHeader: ${authHeader}`);

  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = HTTP_NOT_AUTHENTICATED;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  console.log(`zavanton - token: ${token}`);

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, APP_SECRET);
  } catch (err) {
    err.statusCode = HTTP_SERVER_ERROR;
    throw err;
  }
  console.log(`zavanton - decodedToken: ${decodedToken}`);

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = HTTP_NOT_AUTHENTICATED;
    throw error;
  }
  req.userId = decodedToken.userId;
  console.log(`zavanton - user id: ${req.userId}`);

  next();
}
