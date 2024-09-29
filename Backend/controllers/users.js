const User = require("../models/User");


module.exports.signupForm = (req, res) => {
  // Placeholder function if you plan to render a form.
  console.log(req.body);
};

module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    
    // Ensure the email doesn't already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const user = new User({ name, email, phoneNumber });
    const signupUser = await User.register(user, password); // Handles password hashing and saving the user

    req.login(signupUser, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Error during login. Please try again.' });
      }
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
  
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
  }
  
  const redirectUrl = res.locals.returnTo || '/userprofile';
  delete req.session.returnTo;
  
  // Optionally send back user data, such as name or email
  res.status(200).json({
    message: 'Signin successful!',
    redirectUrl,
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
};


module.exports.signoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    res.status(200).json({ message: 'Logged out successfully!' });
  });
};

