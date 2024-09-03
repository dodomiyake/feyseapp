const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }
});

// Apply passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email', // Use email as the username field
});

const User = mongoose.model('User', userSchema);  

module.exports = User;
