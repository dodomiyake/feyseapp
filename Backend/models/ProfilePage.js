const mongoose = require("mongoose");
const { Schema } = mongoose;

// Profile Picture Schema
const ProfilePicSchema = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true }
});

// Virtual for generating a thumbnail version of the profile picture
ProfilePicSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

// Main ProfilePage Schema
const ProfilePageSchema = new Schema({
  user: {
    profilePic: { type: ProfilePicSchema, required: true }, // Profile picture is required
    measurements: {
      blouseDress: {
        bust: { type: Number, required: true }, // in inches or centimeters
        waist: { type: Number, required: true },
        hip: { type: Number, required: true },
        underBustLength: { type: Number, required: true },
        underBustCircumference: { type: Number, required: true },
        upperBustLength: { type: Number, required: true },
        upperBustCircumference: { type: Number, required: true },
        napeWaist: { type: Number, required: true },
        xb: { type: Number, required: true },
        chestWidth: { type: Number, required: true },
        gownLength: { type: Number, required: true },
        kneeLength: { type: Number, required: true },
        kneeCircumference: { type: Number, required: true },
        blouseLength: { type: Number, required: true },
        topArm: { type: Number, required: true },
        shoulder: { type: Number, required: true }
      },
      trouser: {
        trouserWaist: { type: Number, required: true },
        trouserHip: { type: Number, required: true },
        thighCircumference: { type: Number, required: true },
        crotch: { type: Number, required: true },
        waistAnkle: { type: Number, required: true },
        ankleCircumference: { type: Number, required: true },
        trouserKneeLength: { type: Number, required: true },
        trouserKneeCircumference: { type: Number, required: true },
        trouserLength: { type: Number, required: true }
      },
      sleeve: {
        sleeveLength: { type: Number, required: true },
        sleeveTopArm: { type: Number, required: true },
        armElbow: { type: Number, required: true },
        armWrist: { type: Number, required: true },
        wristCircumference: { type: Number, required: true }
      }
    },
    dressImages: [{ type: String, required: true }]
  }
});

// Create the model
const ProfilePage = mongoose.model("ProfilePage", ProfilePageSchema);

module.exports = ProfilePage;
