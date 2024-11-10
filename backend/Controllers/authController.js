import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = user => {
    try {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );
    } catch (error) {
        console.error('Token generation error:', error);
        return null;
    }
};

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    console.log('Request Body:', req.body); // Log the incoming request body

    try {
        let user = null;

        // Check if user exists
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user based on role
        if (role === 'patient') {
            user = new User({ name, email, password: hashPassword, photo, gender, role });
        } else if (role === 'doctor') {
            user = new Doctor({ name, email, password: hashPassword, photo, gender, role });
        }

        // Save the user
        await user.save();
        res.status(200).json({ success: true, message: 'User successfully created' });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error, try again' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;

        // Search for the user by email in both collections
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        user = patient || doctor;

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        // Generate token
        const token = generateToken(user);
        if (!token) {
            return res.status(500).json({ success: false, message: 'Failed to generate token' });
        }

        // Destructure user data, excluding sensitive fields
        const { password: _, role, ...userData } = user._doc;

        res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            token,
            data: userData,
            role
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};
