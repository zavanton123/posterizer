const models = require('../models/models');
const {Tag, Category} = models;
const {processError} = require("../utils/errors");
const {HTTP_OK} = require('../utils/constants');


exports.fetchCategories = async (req, res, next) => {
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

exports.fetchTags = async (req, res, next) => {
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
