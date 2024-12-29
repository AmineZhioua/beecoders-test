import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createCourse, getAllCourses, deleteCourse, updateCourse } from '../controllers/courseController.js';


const router = express.Router();

// Route to Create a Course
router.post('/create', verifyToken, createCourse);

// Route to Get All Courses
router.get('/', getAllCourses);

// Route to Delete a Course
router.delete('/:id', verifyToken, deleteCourse);

// Route to Update a Course
router.put('/:id', verifyToken, updateCourse);

export default router;