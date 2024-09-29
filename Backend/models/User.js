const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // Ensure emails are stored in lowercase
  },
  phoneNumber: {
    type: String, // Store phone number as a string to preserve the format
    required: true,
    unique: true, // Ensure phone numbers are unique
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


// Apply passport-local-mongoose plugin
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email" // Use email as the username field
});

// Check if the model already exists
module.exports = mongoose.model('User', UserSchema);


