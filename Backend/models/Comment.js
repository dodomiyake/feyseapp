const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Profile Picture Schema (assuming this is defined elsewhere in your code)
const ProfilePicSchema = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true }
});

// Comment Schema
const CommentSchema = new Schema({
  commenterName: { type: String, required: true }, // Commenter's name should be a string, not a number
  commentText: { type: String, required: true },  // Comment content
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the 'User' model
    required: true // Author is required
  },
  timestamp: { type: Date, default: Date.now }, // Automatically sets to the current date/time
  commenterProfilePic: ProfilePicSchema // Profile picture (optional or required based on your needs)
});

// Export the model
module.exports = mongoose.model("Comment", CommentSchema);
