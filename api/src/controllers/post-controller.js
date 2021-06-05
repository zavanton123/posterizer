const _ = require('lodash');
const {Post, User, Tag, Category} = require('../models/models');
const {processError} = require("../utils/errors");
const {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_NO_CONTENT,
  HTTP_FORBIDDEN
} = require('../utils/constants');


exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, {'__v': 0});

    if (posts.length > 0) {
      return res.status(HTTP_OK).json({
        message: `Found ${posts.length} posts`,
        posts: posts
      });
    } else {
      return res.status(HTTP_OK).json([]);
    }
  } catch (err) {
    processError(err, next);
  }
};

exports.fetchPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId, {'__v': 0});
    if (post) {
      return res.status(HTTP_OK).json({post: post});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const category = await findOrCreate(req.body.category, Category);
    const tags = await findOrCreateTags(req);
    const tagIds = _.map(tags, '_id');

    // Note: author id is taken from the Authorization header
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.userId,
      category: category._id,
      tags: tagIds
    });

    for (const tag of tags) {
      tag.posts.push(post);
      await tag.save();
    }
    return res.status(HTTP_CREATED).json({post: post});
  } catch (error) {
    processError(error, next);
  }
};


exports.deletePostById = async (req, res, next) => {
  try {
    await checkPost(req);
    const deletedPost = await Post.findByIdAndRemove(req.params.postId);
    if (deletedPost) {
      return res.status(HTTP_NO_CONTENT).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.updatePostById = async (req, res, next) => {
  try {
    await checkPost(req);

    const category = await findOrCreate(req.body.category, Category);
    const tags = await findOrCreateTags(req);
    const tagIds = _.map(tags, '_id');

    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(postId, {
      title: req.body.title,
      content: req.body.content,
      category: category,
      tags: tagIds
    });

    if (post) {
      return res.status(HTTP_NO_CONTENT).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

const checkPost = async (req) => {
  const targetPost = await Post.findById(req.params.postId);
  // check that the post exists
  if (!targetPost) {
    const error = new Error('Post not found');
    error.statusCode = HTTP_NOT_FOUND;
    throw error;
  }

  // check that the authenticated user is the author
  if (req.userId !== targetPost.author._id.toString()) {
    const error = new Error('Only authors can edit or delete their posts');
    error.statusCode = HTTP_FORBIDDEN;
    throw error;
  }
}

const findOrCreate = async (name, Model) => {
  let model;
  model = await Model.findOne({name: name});
  if (!model) {
    model = await Model.create({name: name});
  }
  return model;
}

const findOrCreateTags = async req => {
  const tags = [];
  for (const tagName of req.body.tags) {
    const tag = await findOrCreate(tagName, Tag);
    tags.push(tag);
  }
  return tags;
};
