import {body} from "express-validator";

export const commentValidator = [
  body('content')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: 2})
];
