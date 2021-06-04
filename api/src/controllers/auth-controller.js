const bcrypt = require('bcryptjs');
const {processError} = require("../utils/errors");
const {HTTP_CREATED, HTTP_CONFLICT_ERROR} = require("../utils/constants");
const {User} = require('../models/models');

exports.login = (req, res, next) => {
  return res.json({message: `Login`});
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
