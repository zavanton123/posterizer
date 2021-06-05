const _ = require('lodash');
const {HTTP_OK, HTTP_CREATED, HTTP_NOT_FOUND} = require('../utils/constants');
const {Post, User, Tag, Category} = require('../models/models');
const {processError} = require("../utils/errors");


exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, {
      '_id': 1,
      'title': 1,
      'content': 1,
      'author': 1,
      'category': 1,
      'tags': 1,
      'comments': 1
    });

    if (posts.length > 0) {
      return res.status(HTTP_OK).json({
        message: `Found ${posts.length} posts`,
        posts: posts
      });
    } else {
      return res.status(HTTP_OK).json({
        message: "No posts found"
      });
    }
  } catch (err) {
    processError(err, next);
  }
};

exports.fetchPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId, {
      '_id': 1,
      'title': 1,
      'content': 1,
      'author': 1,
      'category': 1,
      'tags': 1,
      'comments': 1
    });

    if (post) {
      return res.status(HTTP_OK).json({
        message: "Post is found",
        post: post
      });
    } else {
      return res.status(HTTP_NOT_FOUND)
        .json({message: `No post with id ${postId} is found.`});
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

    return res.status(HTTP_CREATED).json({
      message: 'Post created',
      post: post
    });
  } catch (error) {
    processError(error, next);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findByIdAndRemove(postId);
    if (deletedPost) {
      return res.status(HTTP_OK).json({
        message: `Removed the post with id ${postId}`
      });
    } else {
      return res.status(HTTP_OK).json({message: `No post with id ${postId} is found.`});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.updatePostById = async (req, res, next) => {
  try {
    // TODO - zavanton get from authorization header
    const user = await User.create({
      username: 'zavanton',
      email: 'zavanton@yandex.ru',
      password: 'some-pass'
    });

    const category = await findOrCreate(req.body.category, Category);
    const tags = await findOrCreateTags(req);
    const tagIds = _.map(tags, '_id');

    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(postId, {
      title: req.body.title,
      content: req.body.content,
      author: user._id,
      category: category,
      tags: tagIds
    });

    if (post) {
      return res.status(HTTP_OK).json({
        message: "Post is updated",
        post: post
      });
    } else {
      return res.json({message: `No post with id ${postId} is found.`});
    }
  } catch (err) {
    processError(err, next);
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
