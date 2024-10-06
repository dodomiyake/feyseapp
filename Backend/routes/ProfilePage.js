const express = require('express');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const profilepageController = require('../controllers/ProfilePage');
const { storage } = require('../cloudinary'); // Cloudinary storage config
const { isLoggedIn, isAuthor } = require('../middleware');

// Setup multer for image uploads
const upload = multer({ storage });

// Initialize the router
const router = express.Router();

// Define routes

// Get all profiles or the user's own profile (you can adjust this as needed)
router.route('/')
    .get(isLoggedIn, catchAsync(profilepageController.index))  // List or display profile page
    .post(isLoggedIn, upload.array('image'), catchAsync(profilepageController.createUserInfo)); // Create user info with image upload

// View a specific profile by ID
router.route('/profile/:id')
    .get(isLoggedIn, isAuthor, catchAsync(profilepageController.showUserProfile))  // View a profile by ID

// Export the router
module.exports = router;
