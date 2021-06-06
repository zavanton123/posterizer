const {body} = require('express-validator');
const {User} = require('../models/models');
const {PASSWORD_MIN_LENGTH} = require('../utils/constants');

exports.signUpValidator = [
  body('username')
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
  body('email').trim().isEmail().withMessage('Enter valid email!')
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
  body('password').trim().isLength({min: PASSWORD_MIN_LENGTH}),
  body('confirm-password').trim().isLength({min: PASSWORD_MIN_LENGTH}),
]

exports.loginValidator =
  [
    body('username').trim().not().isEmpty(),
    body('password').trim().isLength({min: PASSWORD_MIN_LENGTH}),
  ]
