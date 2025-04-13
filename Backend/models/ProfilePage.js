const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfilePicSchema = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
});

ProfilePicSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const ProfilePageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ url: String, filename: String }],
  measurements: {
    blouseDress: {
      bust: { type: Number, required: true },
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
      shoulder: { type: Number, required: true },
    },
    trouser: {
      trouserWaist: { type: Number, required: true },
      trouserHip: { type: Number, required: true },
      thighCircumference: { type: Number, required: true },
      crotch: { type: Number, required: true },
      waistAnkle: { type: Number, required: true },
      ankleCircumference: { type: Number, required: true },
      trouserLength: { type: Number, required: true },
    },
    sleeve: {
      sleeveLength: { type: Number, required: true },
      sleeveTopArm: { type: Number, required: true },
      armElbow: { type: Number, required: true },
      armWrist: { type: Number, required: true },
      wristCircumference: { type: Number, required: true },
    },
  },
});

module.exports = mongoose.model('ProfilePage', ProfilePageSchema);
