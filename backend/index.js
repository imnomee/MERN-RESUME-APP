// Imports
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/user.routes.js';

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
app.use('/api/v1/user', userRoute);
//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log('Server running at port:', PORT);
});
