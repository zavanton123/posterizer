import {HttpException} from "../utils/errors";

const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {processError} = require('../utils/errors');
const {User} = require('../models/models');
const {APP_SECRET} = process.env;
const {
  HTTP_CREATED,
  HTTP_NOT_AUTHENTICATED,
  HTTP_OK,
  JWT_TOKEN_DURATION,
  HTTP_UNPROCESSABLE_ENTITY
} = require('../utils/constants');


exports.signup = async (req, res, next) => {
  try {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // error.data = errors.array();
      throw new HttpException('Validation failed', HTTP_UNPROCESSABLE_ENTITY);
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
      // error.data = errors.array();
      throw new HttpException('Validation failed', HTTP_UNPROCESSABLE_ENTITY);
    }
    // check user and password
    const user = await User.findOne({username: req.body.username});
    await checkPassword(req.body.password, user);

    if (user) {
      // create and return token
      const token = createToken(user);
      return res.status(HTTP_OK).json({id: user._id, token: token});
    } else {
      return res.status(HTTP_NOT_AUTHENTICATED).json({});
    }
  } catch (err) {
    processError(err, next);
  }
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
