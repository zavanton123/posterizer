const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {processError} = require("../utils/errors");
const {HTTP_CREATED, HTTP_CONFLICT_ERROR, HTTP_NOT_AUTHENTICATED} = require("../utils/constants");
const {User} = require('../models/models');
const {APP_SECRET} = process.env;


exports.login = async (req, res, next) => {
  try {
    const user = await checkUserExists(req.body.username);
    await checkPassword(req.body.password, user)
    const token = createToken(user);

    return res.json({
      message: "Login success",
      id: user._id,
      token: token
    });
  } catch (err) {
    processError(err, next);
  }
}

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body['confirm-password'];

  try {
    await ensureUniqueUsername(username, next);
    await ensureUniqueEmail(email, next, res);
    ensureEqualPasswords(password, confirmPassword);

    const hashedPassword = await bcrypt.hash(password, 12);
    const savedUser = await User.create({username: username, email: email, password: hashedPassword});

    return res.status(HTTP_CREATED).json({
      message: 'A new user saved successfully',
      user: {
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (err) {
    processError(err, next);
  }
}

async function ensureUniqueUsername(username, next) {
  const dbUser = await User.find({username: username});
  if (dbUser.length > 0) {
    const error = new Error(`A user with the username ${username} already exists!`);
    error.statusCode = HTTP_CONFLICT_ERROR;
    throw error;
  }
}

async function ensureUniqueEmail(email, next, res) {
  const emailUser = await User.find({email: email});
  if (emailUser.length > 0) {
    const error = new Error(`A user with the email ${email} already exists!`);
    error.statusCode = HTTP_CONFLICT_ERROR;
    throw error;
  }
}

function ensureEqualPasswords(password, confirmPassword) {
  if (password !== confirmPassword) {
    const error = new Error(`The confirm password must be the same as the password!`);
    error.statusCode = HTTP_CONFLICT_ERROR;
    throw error;
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
    {
      id: user._id,
      username: user.username,
      email: user.email
    },
    APP_SECRET,
    {expiresIn: '1d'}
  );
}
