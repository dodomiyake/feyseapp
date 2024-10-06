const flash = require("connect-flash");
const ProfilePage = require("./models/ProfilePage");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/"); // Redirect to login if not authenticated
  }
  next();
};

// Middleware to check if the logged-in user is the owner of the profile

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const profile = await ProfilePage.findById(id);

  // Check if the logged-in user is the owner of the profile
  if (!profile.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to view this page");
    return res.redirect(`/profile/${req.user._id}`); // Redirect to the user's own profile
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
