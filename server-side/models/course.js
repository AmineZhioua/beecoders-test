import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    courseDate: { type: Date, required: true, default: Date.now() },
    teacher: { type: String, required: true },
    imageUrl: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
});

const Course = models.Course || mongoose.model("Course", courseSchema);


export default Course;