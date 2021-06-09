import {body} from "express-validator";

export const postValidator = [
  body('title')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: 5}),

  body('content')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: 10}),

  body('category')
    .not()
    .isEmpty()
    .trim()
    .isLength({min: 2}),
];
