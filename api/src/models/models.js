const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  tags: [
    {
      type: ObjectId,
      ref: 'Tag'
    }
  ]
});


const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});


const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: [
    {
      type: ObjectId,
      ref: 'Post'
    }
  ]
});


const CommentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'Comment'
  },
  post: {
    type: ObjectId,
    ref: 'Post'
  }
});

exports.Post = mongoose.model('Post', PostSchema);
exports.Tag = mongoose.model('Tag', TagSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.User = mongoose.model('User', UserSchema);
exports.Category = mongoose.model('Category', CategorySchema);
