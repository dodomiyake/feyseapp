const express = require("express");
const router = express.Router();
const passport = require("passport");
const { storeReturnTo } = require('../middleware');
const catchAsync = require("../utils/catchAsync");


const users = require('../controllers/users');

router.route('/signup')
    .get(users.signupForm)
    .post(catchAsync(users.signupUser));

router.route('/signin')
    .get(users.signinForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin'}), users.signinUser);

router.get('/signout', users.signoutUser);


module.exports = router;