const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Tag', TagSchema);
