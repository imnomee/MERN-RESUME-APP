// Imports
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './utils/db.js';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

//routes
app.get('/home', (req, res) => {
    return res.status(200).json({
        message: 'Hello from backend.',
        success: true,
    });
});

//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log('Server running at port:', PORT);
});
