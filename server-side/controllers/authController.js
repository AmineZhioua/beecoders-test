import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../models/admin.js';


// Loading the environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function signUpFunction(req, res) {
    const { username, email, password } = req.body;
    try {
        const admin = await Admin.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function loginFunction(req, res) {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        };

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
