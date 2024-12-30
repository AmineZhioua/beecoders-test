import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

// Fetch all courses
export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/courses/`);
  return response.data;
};

// Create a new course
export const createCourse = async (course: any) => {
  const response = await axios.post(`${API_URL}/courses/create`, course, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

// Update an existing course
export const updateCourse = async (id: string, updatedCourse: any) => {
  const response = await axios.put(`${API_URL}/courses/${id}`, updatedCourse, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      }
  );
  return response.data;
};

// Delete a course
export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${API_URL}/courses/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
    }
  );
  return response.data;
};
