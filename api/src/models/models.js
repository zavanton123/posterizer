const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // category: {
  //   type: Schema.Types.ObjecId,
  //   ref: 'Category'
  // },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
});


// const CategorySchema = new Schema({
//   name: String
// });


const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
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

exports.Post = mongoose.model('Post', PostSchema);
// exports.Category = mongoose.model('Category', CategorySchema);
exports.Tag = mongoose.model('Tag', TagSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.User = mongoose.model('User', UserSchema);
