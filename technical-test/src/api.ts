import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// Fetch all courses
export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/courses/`);
  return response.data;
};