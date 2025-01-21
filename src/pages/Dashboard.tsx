import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MoreVertical,
  PlayCircle,
  CheckCircle
} from 'lucide-react';

const courses = [
  {
    id: 1,
    name: 'Operating System',
    instructor: 'Mark Lee',
    description: 'Learn the basic operating system abstractions, mechanisms, and their implementations.',
    progress: 75,
    nextLesson: 'Process Management',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=640',
    upcomingDeadlines: [
      { title: 'Assignment 3', date: '2024-03-15' },
      { title: 'Mid-term Exam', date: '2024-03-20' }
    ]
  },
  {
    id: 2,
    name: 'Artificial Intelligence',
    instructor: 'Jung Jaehyun',
    description: 'Intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals.',
    progress: 45,
    nextLesson: 'Neural Networks',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=640',
    upcomingDeadlines: [
      { title: 'Project Proposal', date: '2024-03-18' }
    ]
  },
  {
    id: 3,
    name: 'Software Engineering',
    instructor: 'Kim Taeyeong',
    description: 'Learn advanced concepts in the design, development and maintenance of software.',
    progress: 30,
    nextLesson: 'Agile Methodologies',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=640',
    upcomingDeadlines: [
      { title: 'Group Project', date: '2024-03-25' }
    ]
  }
];

const onlineUsers = [
  {
    name: 'Maren Maureen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64',
    status: 'online'
  },
  {
    name: 'Jennifer Jane',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=64',
    status: 'online'
  },
  {
    name: 'Ryan Herwinds',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=64',
    status: 'online'
  }
];

export function Dashboard() {
  const currentMonth = 'Nov 2020';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">My Courses</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]">
                <option>Time</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]">
                <option>Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img src={course.image} alt={course.name} className="w-24 h-24 rounded-lg object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500">Created by {course.instructor}</p>
                    </div>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{course.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-[#5B5FC7]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#5B5FC7] h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex items-center text-sm text-[#5B5FC7] hover:text-[#4A4DB4]">
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Continue Learning
                    </button>
                    <span className="text-sm text-gray-500">Next: {course.nextLesson}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Calendar */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{currentMonth}</h3>
            <div className="flex space-x-2">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          {/* Calendar grid would go here */}
        </div>

        {/* Online Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Online Users</h3>
            <button className="text-sm text-[#5B5FC7] hover:text-[#4A4DB4]">See all</button>
          </div>
          <div className="space-y-4">
            {onlineUsers.map((user) => (
              <div key={user.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <div className="h-2 w-2 bg-green-400 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}