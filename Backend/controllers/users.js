const User = require('../models/User');
const passport = require('passport');

module.exports.signupUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const user = new User({ name, email, phoneNumber });
    const newUser = await User.register(user, password);

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Signup successful!' });
    });
  } catch (err) {
    next(err);
  }
};

module.exports.signinUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message || 'Authentication failed.' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ userId: user._id });
    });
  })(req, res, next);
};

module.exports.signoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully!' });
      });
    });
  });
};
