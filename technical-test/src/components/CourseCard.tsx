import { Calendar, MapPin, User } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { format } from 'date-fns';


interface Course {
    price: number;
    category: string;
    title: string;
    courseDate: string;
    location: string;
    teacher: string;
    imageUrl: string;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300 md:min-h-[438px]'>
            <a 
                href='#' 
                className='relative flex-center flex-grow bg-gray-200 bg-cover bg-center text-grey-500 overflow-hidden'
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <img
                    src={course.imageUrl}
                    alt='course'
                    className='w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110'
                />
            </a>

            <div className='flex min-h-[230px] flex-col gap-4 p-6'>
                {/* Price and Category */}
                <div className='flex gap-3 items-center'>
                    <span className='font-medium text-sm rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-1.5 shadow-sm'>
                        {`${course.price} TND`}
                    </span>
                    <p className='font-medium text-sm rounded-full bg-gray-100 px-4 py-1.5 text-gray-600'>
                        {course.category}
                    </p>
                </div>

                {/* Title */}
                <a href="#" className="group">
                    <h3 className='text-lg font-semibold leading-tight tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2'>
                        {course.title}
                    </h3>
                </a>

                {/* Course Details */}
                <div className='space-y-3 text-gray-600'>
                    <div className='flex items-center'>
                        <Calendar className="w-4 h-4 mr-2.5 text-orange-500" />
                        <p className='text-sm'>
                            {format(new Date(course.courseDate), 'MMM dd, yyyy')}
                        </p>
                    </div>

                    <div className='flex items-center'>
                        <MapPin className="w-4 h-4 mr-2.5 text-orange-500" />
                        <p className='text-sm line-clamp-1'>
                            {course.location}
                        </p>
                    </div>
                </div>

                {/* Teacher and CTA */}
                <div className='flex justify-between items-center w-full pt-4 mt-auto border-t border-gray-100'>
                    <div className='flex items-center'>
                        <User className="w-5 h-5 mr-2.5 text-orange-500" />
                        <p className='text-sm font-medium text-gray-700'>
                            {course.teacher}
                        </p>
                    </div>
                    <a href="#" className='flex items-center gap-2'>
                        <Button className='bg-orange-600 hover:bg-orange-700 shadow-sm transition-all duration-300 hover:shadow-md text-sm font-medium'>
                            Join Now
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;

