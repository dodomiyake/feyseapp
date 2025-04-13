const ProfilePage = require('./models/ProfilePage');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/');
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await ProfilePage.findById(id);
    if (!profile.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to view this page');
      return res.redirect(`/profile/${req.user._id}`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
