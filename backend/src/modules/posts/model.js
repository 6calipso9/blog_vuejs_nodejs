const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = function () {
  const Post = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    typePost: { type: String },
    status: { type: String },
    text: { type: String, required: true },
    image: { type: String },
    language: { type: String },
  }, {
    timestamps: true
  });

  return mongoose.model('Post', Post);
};
