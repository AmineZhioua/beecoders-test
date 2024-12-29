import { Button } from './ui/button';
import CourseCard from './CourseCard';
import { motion } from "framer-motion";

interface CourseContentProps {
    courses: {
        _id: string;
        title: string;
        price: number;
        courseDate: string;
        teacher: string;
        imageUrl: string;
        location: string;
        category: string;
    }[];
}

const CourseContent = ({ courses }: CourseContentProps) => {
    return (
        <div className='container mx-auto px-4'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'
            >
                <div className="space-y-2">
                    <h2 className='text-balance font-bold tracking-tight text-gray-900 text-3xl sm:text-4xl'>
                        Discover
                    </h2>
                    <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        our Courses
                    </p>
                </div>
                <Button 
                    className='bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300'
                >
                    View More
                </Button>
            </motion.div>

            <div className="relative mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {courses.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-lg text-gray-600">No courses available at the moment.</p>
                        <p className="text-sm text-gray-500 mt-2">Please check back later!</p>
                    </div>
                ) : (
                    courses.map((course, index) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CourseContent;

