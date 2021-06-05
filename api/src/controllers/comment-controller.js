const models = require('../models/models');
const {processError} = require("../utils/errors");
const {Post} = models;
const {
  HTTP_CREATED,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_NO_CONTENT
} = require('../utils/constants');

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
      return res.status(HTTP_CREATED).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.deleteComment = async (req, res, next) => {
  try {
    await checkCommentAuthor(req);
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const result = await Post.findByIdAndUpdate(postId, {$pull: {comments: {_id: commentId}}});
    if (result) {
      return res.status(HTTP_NO_CONTENT).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

const checkCommentAuthor = async (req) => {
  const post = await Post.findById(req.params.postId);
  for (const comment of post.comments) {
    if (comment._id.toString() === req.params.commentId) {
      if (req.userId !== comment.author._id.toString()) {
        const error = new Error('Only comment authors can update their comments');
        error.statusCode = HTTP_FORBIDDEN
        throw error;
      }
    }
  }
}
