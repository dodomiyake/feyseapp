const User = require("../models/User");


module.exports.signupForm = (req, res) => {
  // Placeholder function if you plan to render a form.
  console.log(req.body);
};

module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, phoneNumber,password } = req.body;
    const user = new User({ name, email, phoneNumber });
    const signupUser = await User.register(user, password);

    req.login(signupUser, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Error during login. Please try again.' });
      }
      // Respond with success message or user data if needed
      res.status(200).json({ message: 'Signup successful!' });
    });
  } catch (e) {
    console.error('Signup error:', e.message);
    res.status(400).json({ message: e.message });
  }
};

module.exports.signinForm = (req, res) => {
  // Placeholder function if you plan to render a form.
  console.log(req.body);
};

module.exports.signinUser = (req, res) => {

  const { email } = req.body;
  // Respond with success or user data if needed
  const redirectUrl = res.locals.returnTo || '/userprofile';
  delete req.session.returnTo;
  res.status(200).json({ redirectUrl });
};

module.exports.signoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Respond with success message
    res.status(200).json({ message: 'Logged out successfully!' });
  });
};
