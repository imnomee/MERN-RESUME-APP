import jwt from 'jsonwebtoken'; // Import JSON Web Token library

// Middleware to check if a user is authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: 'AuthMiddle: No token provided', // Notify client that token is missing
                success: false,
            });
        }

        // Verify the JWT token using the secret key
        const decode = jwt.verify(token, process.env.JWT_KEY); // Decode the token using the secret key
        if (!decode) {
            return res.status(401).json({
                message: 'AuthMiddle: Invalid token', // Notify client that token is invalid
                success: false,
            });
        }

        // Set the userId from decoded token into the request object for later use
        req.id = decode.userId; // Attach the decoded userId to the `req` object

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.log('AuthMiddle:', error); // Log errors for debugging purposes
        return res.status(500).json({
            message: 'AuthMiddle: Server error',
            success: false,
        });
    }
};

export default isAuthenticated; // Export the middleware function
