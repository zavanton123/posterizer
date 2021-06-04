const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User'
  }
});

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
  ],
  comments: [CommentSchema]
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


exports.Post = mongoose.model('Post', PostSchema);
exports.User = mongoose.model('User', UserSchema);
exports.Category = mongoose.model('Category', CategorySchema);
exports.Tag = mongoose.model('Tag', TagSchema);
