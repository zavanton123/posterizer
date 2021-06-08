import {HttpException} from "../utils/errors";
import {HTTP_CONFLICT_ERROR, HTTP_NOT_AUTHENTICATED, PASSWORD_MIN_LENGTH} from "../utils/constants";
import {body} from "express-validator";

const {User} = require('../models/models');


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
      if (value !== req.body.password) {
        throw new HttpException(
          'The confirm password must be the same as the password!',
          HTTP_CONFLICT_ERROR
        );
      }
      return true;
    })
]

exports.loginValidator =
  [
    body('username')
      .not()
      .isEmpty()
      .trim()
      .custom((value, {req}) => {
        return User.findOne({username: value})
          .then(user => {
            if (!user) {
              throw new HttpException(
                'The user with this username does not exist',
                HTTP_NOT_AUTHENTICATED
              );
            }
          });
      }),

    body('password')
      .not()
      .isEmpty()
      .trim()
      .isLength({min: PASSWORD_MIN_LENGTH})
  ]
