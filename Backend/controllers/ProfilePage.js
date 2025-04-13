const ProfilePage = require('../models/ProfilePage');
const { cloudinary } = require('../cloudinary');

module.exports.createUserInfo = async (req, res, next) => {
  try {
    const profileData = req.body.profile;
    if (!profileData) {
      return res.status(400).json({ message: 'Invalid profile data provided.' });
    }

    const profile = new ProfilePage({
      ...profileData,
      author: req.user._id,
      images: req.files.map((file) => ({ url: file.path, filename: file.filename })),
    });

    await profile.save();
    req.flash('success', 'Profile created successfully!');
    res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.showUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash('error', 'User not found!');
      return res.redirect('/users');
    }
    res.render('users/show', { user });
  } catch (err) {
    next(err);
  }
};
