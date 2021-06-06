const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {processError} = require('../utils/errors');
const {User} = require('../models/models');
const {APP_SECRET} = process.env;
const {
  HTTP_CREATED,
  HTTP_NOT_AUTHENTICATED,
  JWT_TOKEN_DURATION,
  HTTP_UNPROCESSABLE_ENTITY
} = require('../utils/constants');


exports.signup = async (req, res, next) => {
  try {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = HTTP_UNPROCESSABLE_ENTITY;
      error.data = errors.array();
      throw error;
    }
    // hash password and persist user
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({username: username, email: email, password: hashedPassword});

    return res.status(HTTP_CREATED).json({
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    processError(err, next);
  }
}

exports.login = async (req, res, next) => {
  try {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = HTTP_UNPROCESSABLE_ENTITY;
      error.data = errors.array();
      throw error;
    }
    // check user and password
    const user = await checkUserExists(req.body.username);
    await checkPassword(req.body.password, user)
    // create and return token
    const token = createToken(user);
    return res.json({id: user._id, token: token});
  } catch (err) {
    processError(err, next);
  }
}

async function checkUserExists(username) {
  const user = await User.findOne({username: username});
  if (!user) {
    const error = new Error('The user with this username does not exist');
    error.statusCode = HTTP_NOT_AUTHENTICATED;
    throw error;
  }
  return user;
}

async function checkPassword(password, user) {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Wrong password!');
    error.statusCode = HTTP_NOT_AUTHENTICATED;
    throw error;
  }
}

function createToken(user) {
  return jwt.sign(
    {userId: user._id, username: user.username, email: user.email},
    APP_SECRET,
    {expiresIn: JWT_TOKEN_DURATION}
  );
}
