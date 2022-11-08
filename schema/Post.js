const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: String
  },
  images: {
    type: Array
  }
})

module.exports = mongoose.model("Post", postSchema);