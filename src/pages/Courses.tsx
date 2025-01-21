import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    enrolled: 245,
    rating: 4.8,
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=640',
  },
  {
    id: 2,
    name: 'Advanced Mathematics',
    instructor: 'Prof. Michael Chen',
    enrolled: 180,
    rating: 4.6,
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=640',
  },
  {
    id: 3,
    name: 'Digital Electronics',
    instructor: 'Dr. Robert Wilson',
    enrolled: 210,
    rating: 4.7,
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1631556097152-c39479bbfb93?auto=format&fit=crop&q=80&w=640',
  },
];

export function Courses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Available Courses</h1>
        <div className="flex space-x-2">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Categories</option>
            <option>Computer Science</option>
            <option>Mathematics</option>
            <option>Electronics</option>
          </select>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Sort by: Latest</option>
            <option>Most Popular</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{course.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {course.enrolled} students
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="h-4 w-4 mr-1" />
                  {course.rating}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}