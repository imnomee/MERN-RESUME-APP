import express from 'express'; // Import Express framework
import {
    login,
    logout,
    register,
    updateProfile,
} from '../controllers/user.controller.js'; // Import user-related controllers
import isAuthenticated from '../middlewares/isAuthenticated.middle.js'; // Import middleware for authentication

const router = express.Router(); // Create a new instance of the Express router

// Route for user registration
router.route('/register').post(register);
// POST request for user registration. The `register` controller handles user creation.

// Route for user login
router.route('/login').post(login);
// POST request for user login. The `login` controller handles user authentication and token generation.

// Route for updating user profile
router.route('/profile/update').post(isAuthenticated, updateProfile);
// POST request to update the user profile.
// The `isAuthenticated` middleware ensures the user is logged in before allowing profile updates.
// The `updateProfile` controller handles the logic of updating the user's profile.

// Route for logging the user out
router.route('/logout').get(logout);

export default router; // Export the router for use in other parts of the application
