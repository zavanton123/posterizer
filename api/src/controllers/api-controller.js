const Post = require('../models/posts');

exports.getStatus = (req, res, next) => {
  return res.json({
    status: 'Get Status'
  });
};

exports.createPost = async (req, res, next) => {
  const post = await Post.create({title: req.body.title});
  return res.json({
    message: 'Post created',
    post: post
  });
};
