const User = require("../models/User");

module.exports.signupForm = (req, res) => {
  // res.render("user/signup");
  console.log(req.body);
};

module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email });
    const signupUser = await User.register(user, password);
    req.login(signupUser, (err) => {
      if (err) return next(err);
      // req.flash("success", `Welcome to YelpCamp Campground, ${username}!`);
      res.redirect("/profilePage");
    });
  } catch (e) {
    // req.flash('error', e.message);
    res.redirect("signup");
  }
};

module.exports.signinForm = (req, res) => {
//   res.render("user/signin");
  console.log(req.body);
};

module.exports.signinUser = (req, res) => {
    const { name } = req.body;
    // req.flash('success', `Welcome back, ${username}!`);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.signoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}