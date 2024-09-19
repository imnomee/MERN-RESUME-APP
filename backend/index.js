// Import necessary modules and libraries
import cookieParser from 'cookie-parser'; // Middleware for parsing cookies
import express from 'express'; // Express framework for handling HTTP requests
import cors from 'cors'; // Middleware for Cross-Origin Resource Sharing (CORS)
import dotenv from 'dotenv'; // Load environment variables from .env file
import userRoute from './routes/user.routes.js'; // Import user routes
import companyRoute from './routes/company.routes.js';
// Import company routes

dotenv.config(); // Load environment variables

import connectDB from './utils/db.js'; // Import function to connect to the database

const app = express(); // Create an instance of the Express application

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies (necessary for authentication and session handling)
app.use(cookieParser());

// CORS configuration to allow specific front-end domain
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this front-end URL
    credentials: true, // Allow sending credentials (e.g., cookies) with requests
};
app.use(cors(corsOptions)); // Apply CORS middleware with specified options

// Register user-related routes under the `/api/v1/user` endpoint
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);

// Listener: Start the server on the specified port
const PORT = process.env.PORT || 5000; // Default port set to 5000 if not specified in the .env

/* TODO: wrap listener and db connection in try catch */
app.listen(PORT, () => {
    connectDB(); // Connect to the database before handling requests
    console.log('Server running at port:', PORT); // Log the port number when the server starts
});
