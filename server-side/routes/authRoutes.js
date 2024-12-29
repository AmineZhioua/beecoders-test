import express from 'express';
import { signUpFunction, loginFunction } from '../controllers/authController.js';


const router = express.Router();

// Route for Sign Up
router.post('/signup', signUpFunction);

// Route for Login
router.post('/login', loginFunction);


export default router;