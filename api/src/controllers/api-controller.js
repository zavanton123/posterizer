const Post = require('../models/posts');

exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, {'_id': 1, 'title': 1});
    if (posts.length > 0) {
      return res.json({
        message: `Found ${posts.length} posts`,
        posts: posts
      });
    } else {
      return res.json({
        message: "No posts found"
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const post = await Post.create({title: req.body.title});
  return res.json({
    message: 'Post created',
    post: post
  });
};
