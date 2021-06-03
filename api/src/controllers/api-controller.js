const Post = require('../models/posts');
const {processError} = require("../utils/errors");

exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, {'_id': 1, 'title': 1});
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
    const post = await Post.findById(postId);
    if (post) {
      return res.status(200).json({
        message: "Post is found",
        post: {
          _id: post._id,
          title: post.title
        }
      });
    } else {
      return res.json({
        message: `No post with id ${postId} is found.`
      });
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({title: req.body.title});
    return res.status(201).json({
      message: 'Post created',
      post: {
        _id: post._id,
        title: post.title
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
        message: 'Removed post',
        post: deletedPost
      });
    } else {
      return res.status(200).json({
        message: `No post with id ${postId} is found.`
      });
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.updatePostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(postId, {title: req.body.title});
    if (post) {
      return res.status(200).json({
        message: "Post is updated",
        post: {
          _id: post._id,
          title: post.title
        }
      });
    } else {
      return res.json({
        message: `No post with id ${postId} is found.`
      });
    }
  } catch (err) {
    processError(err, next);
  }
}
