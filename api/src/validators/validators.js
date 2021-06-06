const {body} = require('express-validator');
const {User} = require('../models/models');
const {PASSWORD_MIN_LENGTH, HTTP_CONFLICT_ERROR} = require('../utils/constants');

exports.signUpValidator = [
  body('username')
    .not()
    .isEmpty()
    .trim()
    .custom((value, {req}) => {
        return User.findOne({username: value})
          .then(user => {
              if (user) {
                return Promise.reject(`A user with the username ${value} already exists!`)
              }
            }
          );
      }
    ),

  body('email')
    .not()
    .isEmpty()
    .trim()
    .isEmail()
    .withMessage('Enter valid email!')
    .normalizeEmail()
    .custom((value, {req}) => {
        return User.findOne({email: value})
          .then(user => {
              if (user) {
                return Promise.reject(`A user with the email ${value} already exists!`)
              }
            }
          );
      }
    ),

  body('password')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: PASSWORD_MIN_LENGTH}),

  body('confirm-password')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: PASSWORD_MIN_LENGTH})
    .custom((value, {req}) => {
      if (value !== req['confirm-password']) {
        const error = new Error('The confirm password must be the same as the password!');
        error.statusCode = HTTP_CONFLICT_ERROR;
        throw error;
      }
    })
]

exports.loginValidator =
  [
    body('username')
      .not()
      .isEmpty()
      .trim(),

    body('password')
      .not()
      .isEmpty()
      .trim()
      .isLength({min: PASSWORD_MIN_LENGTH}),
  ]
