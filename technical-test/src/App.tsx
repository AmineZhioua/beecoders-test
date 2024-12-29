import { useEffect, useState } from "react";
import CourseContent from "./components/CourseContent";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { getAllCourses } from "./api";




function App() {
  const[courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);


  return (
    <div className='flex flex-col min-h-screen container mx-auto py-8 space-y-12'>
      <Header />
      <Landing />
      <CourseContent courses={courses} />
    </div>
  );

}




export default App;