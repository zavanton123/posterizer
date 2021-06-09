import {processError} from "../utils/errors";
import {HTTP_OK} from "../utils/constants";
import {NextFunction, Request, Response} from "express";

const models = require('../models/models');
const {Tag, Category} = models;


export async function fetchCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await Category.find({}, {'__v': 0});
    if (categories.length > 0) {
      return res.status(HTTP_OK)
        .json({
          message: `Found ${categories.length} categories`,
          categories: categories
        });
    } else {
      return res.status(HTTP_OK).json([]);
    }
  } catch (err) {
    processError(err, next);
  }
}

export async function fetchTags(req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await Tag.find({}, {'__v': 0});
    if (tags.length > 0) {
      return res.status(HTTP_OK)
        .json({
          message: `Found ${tags.length} tags`,
          tags: tags
        });
    } else {
      return res.status(HTTP_OK).json([]);
    }
  } catch (err) {
    processError(err, next);
  }
}
