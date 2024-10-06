const User = require("../models/User");
const passport = require('passport');


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

module.exports.signinUser = (req, res, next) => { // Log the request body to check for email and password

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }

    // If no user is found, authentication failed
    if (!user) {
      return res.status(401).json({ message: info.message || "Authentication failed. Check your credentials." });
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return next(err);
      }

      // Authentication successful, return the userId
      res.status(200).json({ userId: user._id }); // Ensure user._id exists in your user model
    });
  })(req, res, next);
};


module.exports.signoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }

    // Regenerate the session to prevent session fixation attacks
    req.session.regenerate((err) => {
      if (err) {
        console.error('Error regenerating session:', err);
        return next(err);
      }

      // Destroy the session after logout
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return next(err);
        }

        // Clear the session cookie from the browser
        res.clearCookie('connect.sid');

        // Redirect or respond after successful logout
        res.status(200).json({ message: 'Logged out successfully!' });
      });
    });
  });
};


