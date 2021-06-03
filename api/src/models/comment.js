const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
