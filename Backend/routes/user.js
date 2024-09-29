const express = require("express");
const router = express.Router();
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const users = require("../controllers/users");

router.route("/signup").post(catchAsync(users.signupUser));


// Signin route
router.route("/signin")
.post((req, res, next) => {
  console.log("Request Body:", req.body);  // Log the request body to check for email and password

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
      res.status(200).json({ userId: user._id }); // Make sure user._id exists in your user model
    });
  })(req, res, next);
});


router.get("/signout", users.signoutUser);

module.exports = router;
