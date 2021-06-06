const {body} = require('express-validator');

exports.commentValidator = [
  body('content')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: 2})
]
