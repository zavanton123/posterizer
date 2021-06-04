const {HTTP_CONFLICT_ERROR} = require("../utils/constants");
const {
  User
} = require('../models/models');

exports.login = (req, res, next) => {
  return res.json({message: `Login`});
}


exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body['confirm-password'];

  // Ensure no user with the same username exists
  const dbUser = await User.find({username: username});
  if (dbUser.length > 0) {
    const error = new Error(`A user with the username ${username} already exists!`);
    error.statusCode = HTTP_CONFLICT_ERROR;
    next(error);
  }

  // Ensure no user with the same email exists
  const emailUser = await User.find({email: email});
  if (emailUser.length > 0) {
    const error = new Error(`A user with the email ${email} already exists!`);
    error.statusCode = HTTP_CONFLICT_ERROR;
    next(error);
  } else {
    return res.json({message: `Signup`});
  }

}
