const ProfilePage = require('../models/ProfilePage');
const { cloudinary } = require('../cloudinary');

module.exports.createUserInfo = async (req, res, next) => {
  try {
    // Ensure req.body.profile exists and map the required fields
    const profile = new ProfilePage(req.body.profile); // Assuming the profile data is in req.body.profile

    // Associate the profile with the logged-in user
    profile.author = req.user._id;

    // Map the uploaded images to the profile (Multer + Cloudinary)
    profile.images = req.files.map(f => ({ url: f.path, filename: f.filename }));

    // Save the profile to the database
    await profile.save();

    // Flash a success message (make sure you have connect-flash set up)
    req.flash('success', 'Successfully created a new profile!');

    // Redirect to the user's profile page after creation
    res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    // Handle errors
    next(err);
  }
};


module.exports.showUserProfile = async (req, res) => { 
  const user = await User.findById(req.params.id);
  if(!user){
    req.flash('error', 'Cannot find user!');
    return res.redirect("/users");
  }
  res.render("users/show", { user });
}

