import axios from "axios";

const API_URL = "http://localhost:5000/api";


// Fetch all courses
export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/courses/`);
  return response.data;
};