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
  category: {
    type: Schema.Types.ObjecId,
    ref: 'Category'
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
});

module.exports = mongoose.model('Post', PostSchema);
