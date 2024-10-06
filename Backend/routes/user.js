const express = require("express");
const router = express.Router();
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const users = require("../controllers/users");

router.route("/signup").post(catchAsync(users.signupUser));


// Signin route
router.route("/signin")
.post(storeReturnTo, users.signinUser); 


router.get("/signout", users.signoutUser);

module.exports = router;
