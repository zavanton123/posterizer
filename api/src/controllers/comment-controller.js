const models = require('../models/models');
const {processError} = require("../utils/errors");
const {Post} = models;
const {HTTP_CREATED, HTTP_NOT_FOUND} = require('../utils/constants');

exports.createComment = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push:
          {
            comments: {
              author: req.userId,
              content: req.body.content
            }
          }
      }
    );

    if (updatedPost) {
      return res.status(HTTP_CREATED)
        .json({message: 'Comment added'});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
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
