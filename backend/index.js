// Imports
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

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
const PORT = 7860;
app.listen(PORT, () => {
    console.log('Server running at port:', PORT);
});
