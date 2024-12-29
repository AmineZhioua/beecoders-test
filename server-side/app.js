import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';



// Config
dotenv.config();
const app = express();

// Database connection
connectToDatabase();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);



// Home route
app.get('/', (req, res) => {
    res.send('Hello World');
});



// PORT & Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);