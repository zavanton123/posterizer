const models = require('../models/models');
const {processError} = require("../utils/errors");
const {Post, User} = models;

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
    const result = await Post.findByIdAndUpdate(postId, {$push: {comments: {author: user._id, content: content}}});
    if (result) {
      return res.json({message: 'Comment added'});
    } else {
      return res.json({message: 'Failed to add the comment'});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.deleteComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const result = await Post.findByIdAndUpdate(postId, {$pull: {comments: {_id: commentId}}});
    if (result) {
      return res.json({message: 'The comment is removed'});
    } else {
      return res.json({messaged: 'Failed to remove the comment'});
    }
  } catch (err) {
    processError(err, next);
  }
}
