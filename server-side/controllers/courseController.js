import mongoose from "mongoose";
import Course from "../models/course.js";


// Function to Create a Course
export async function createCourse(req, res) {
    try {
        const { 
            title, 
            price, 
            courseDate, 
            teacher, 
            imageUrl, 
            location, 
            category } = req.body;

            const newCourse = new Course({
                title,
                price,
                courseDate,
                teacher,
                imageUrl,
                location,
                category
            });

            const savedPost = await newCourse.save();

            res.status(201).json(savedPost);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


// Function to Get All Courses
export async function getAllCourses(req, res) {
    try {
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


// Function to Delete a Course
export async function deleteCourse(req, res) {
    try {
        const courseToDelete = await Course.findByIdAndDelete(req.params.id);

        if(!courseToDelete) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


// Function to Update a Course
export async function updateCourse(req, res) {
    try {
        const courseToUpdate = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!courseToUpdate) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(courseToUpdate);
        
    } catch (error) {
        res.status(500).json({ error: error });
    }
}