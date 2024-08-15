import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { User } from '../models/user';

const router = express.Router();

interface JwtPayload {
    userId: string;
}
// Register
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user with the provided email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'An account with this email already exists. Would you like to sign in instead?' });
        }

        // Generate a unique username based on firstName and lastName
        const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;

        // Create a new user
        user = new User({
            firstName,
            lastName,
            email,
            username, // Automatically generated username
            password: await bcrypt.hash(password, 10),
        });

        // Save the user to the database
        await user.save();

        // Generate a JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        // Respond with the token
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get current user
router.get('/me', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await User.findById(decoded.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});


// Request password reset
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User with this email does not exist' });
        }

        // Generate a token for password reset
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        // Send the email with the reset link
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `Please click the link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link has been sent to your email' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ error: 'Internal server error while processing the reset password request' });
    }
});


// Reset the password (confirming the token and updating the password)
router.post('/reset-password/confirm', async (req, res) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ error: 'Invalid token or user does not exist' });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;