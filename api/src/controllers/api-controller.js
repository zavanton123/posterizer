const Post = require('../models/posts');

exports.getStatus = (req, res, next) => {
  return res.json({
    status: 'Get Status'
  });
};

exports.createPost = async (req, res, next) => {
  let title = req.body.title;
  console.log(`zavanton - creating a new post: ${title}`);
  const post = await Post.create({title: "hello mongo"});
  return res.json({
    message: 'Post created',
    post: post
  });
};
