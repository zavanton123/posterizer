const _ = require('lodash');
const models = require('../models/models');
const {processError} = require("../utils/errors");
const {Post, User, Tag, Category} = models;

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
      return res.json({
        message: `Found ${posts.length} posts`,
        posts: posts
      });
    } else {
      return res.status(200).json({
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
      return res.status(200).json({
        message: "Post is found",
        post: post
      });
    } else {
      return res.json({message: `No post with id ${postId} is found.`});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.createPost = async (req, res, next) => {
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

    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: user,
      category: category._id,
      tags: tagIds
    });

    for (const tag of tags) {
      tag.posts.push(post);
      tag.save();
    }

    return res.status(201).json({
      message: 'Post created',
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        author: user._id,
        category: post.category._id,
        tags: post.tags
      }
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
      return res.status(200).json({
        message: `Removed the post with id ${postId}`
      });
    } else {
      return res.status(200).json({message: `No post with id ${postId} is found.`});
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
      return res.status(200).json({
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

exports.createComment = async (req, res, next) => {
  try {
    // TODO - zavanton get from authorization header
    const user = await User.create({
      username: 'zavanton',
      email: 'zavanton@yandex.ru',
      password: 'some-pass'
    });

    const postId = req.params.postId;
    const content = req.body.content;

    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            author: user._id,
            content: content
          }
        }
      }
    );
    console.log(`zavanton - result: ${result}`);

    if (result) {
      return res.json({
        message: 'Comment added'
      });
    } else {
      return res.json({message: 'Failed to add the comment'});
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

async function findOrCreateTags(req) {
  const tags = [];
  for (const tagName of req.body.tags) {
    const tag = await findOrCreate(tagName, Tag);
    tags.push(tag);
  }
  return tags;
}

