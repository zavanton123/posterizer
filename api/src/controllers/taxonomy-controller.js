const models = require('../models/models');
const {processError} = require("../utils/errors");
const {Tag, Category} = models;

exports.fetchCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}, {'_id': 1, 'name': 1});
    if (categories.length > 0) {
      return res.json({
        message: `Found ${categories.length} categories`,
        categories: categories
      });
    } else {
      return res.json({message: 'No categories found'});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.fetchTags = async (req, res, next) => {
  try {
    const tags = await Tag.find({}, {'_id': 1, 'name': 1});
    if (tags.length > 0) {
      return res.json({
        message: `Found ${tags.length} tags`,
        tags: tags
      });
    } else {
      return res.json({message: 'No tags found'});
    }
  } catch (err) {
    processError(err, next);
  }
}
