import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS Configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://yourfrontenddomain.com", // Update with your actual frontend domain
};

// API Health Check
app.get('/', (req,res) => {
    res.send("API is working");
});

// MongoDB connection setup
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database is connected');
    } catch (err) {
        console.error('MongoDB database connection failed:', err);
        setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/auth', authRoute);    // domain/api/v1/auth/register
app.use('/api/v1/users', userRoute);   // domain/api/v1/users
app.use('/api/v1/doctors', doctorRoute);  // domain/api/v1/doctors
app.use('/api/v1/reviews', reviewRoute);  // domain/api/v1/reviews

// Start server
app.listen(port, () => {
    if (!process.env.MONGO_URL) {
        console.error('MongoDB URL is missing in the environment variables');
        process.exit(1); // Exit the app if MongoDB URL is missing
    }
    connectDB();
    console.log("Server is running on port " + port);
});
