const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfilePicSchema = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
});

const CommentSchema = new Schema({
  commenterName: { type: String, required: true },
  commentText: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  commenterProfilePic: ProfilePicSchema,
});

module.exports = mongoose.model('Comment', CommentSchema);
