import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Pencil, Trash2, Plus, Search, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { CourseDialog } from '../components/CourseDialog'
import { Course } from '@/types'
import { createCourse, deleteCourse, getAllCourses, updateCourse } from '@/api/apis'



export default function Dashboard() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  

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

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (courseId: string) => {
        try {
            await deleteCourse(courseId);
            setCourses(courses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };


    const handleEdit = (course: Course) => {
        setSelectedCourse(course);
        setIsDialogOpen(true);
    };

    const handleSave = async (updatedCourse: Course) => {
        try {
            if (selectedCourse) {
                // Update course
                const data = await updateCourse(selectedCourse._id, updatedCourse);
                setCourses(courses.map((course) => (course._id === selectedCourse._id ? data : course)));

            } else {
                const data = await createCourse(updatedCourse);
                setCourses([...courses, data]);
            }

            setIsDialogOpen(false);
            setSelectedCourse(null);

        } catch (error) {
            console.error("Error saving course:", error);
        }
    };
   

  return (
    <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Courses</h1>
            <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
            </Button>
        </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses by title, teacher or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>{format(course.courseDate, 'MMM d, yyyy')}</TableCell>
                <TableCell>{course.teacher}</TableCell>
                <TableCell>{course.location}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(course)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(course._id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CourseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        course={selectedCourse}
        onSave={handleSave}
      />
    </div>
  )
}

