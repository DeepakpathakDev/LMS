import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, PlayCircle, FileText } from 'lucide-react';
import { LearningPanel } from '../components/LearningPanel';

export function CourseDetails() {
  const { id } = useParams();
  const [showLearningPanel, setShowLearningPanel] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Mock course data
  const course = {
    id: parseInt(id || '1'),
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    description: 'A comprehensive introduction to computer science fundamentals, covering algorithms, data structures, and programming concepts.',
    enrolled: 245,
    rating: 4.8,
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=640',
    chapters: [
      {
        id: 1,
        title: 'Introduction to Programming',
        videoUrl: 'https://example.com/video1.mp4',
        pdfUrl: 'https://example.com/notes1.pdf',
        completed: false,
        lessons: [
          { id: 1, title: 'Getting Started with Python', duration: '45 min' },
          { id: 2, title: 'Variables and Data Types', duration: '30 min' },
          { id: 3, title: 'Control Structures', duration: '40 min' },
        ],
      },
      {
        id: 2,
        title: 'Data Structures',
        videoUrl: 'https://example.com/video2.mp4',
        pdfUrl: 'https://example.com/notes2.pdf',
        completed: false,
        lessons: [
          { id: 4, title: 'Arrays and Lists', duration: '35 min' },
          { id: 5, title: 'Stacks and Queues', duration: '45 min' },
          { id: 6, title: 'Trees and Graphs', duration: '50 min' },
        ],
      },
    ],
  };

  const handleChapterClick = (chapter: any) => {
    setSelectedChapter(chapter);
    setShowLearningPanel(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative h-64">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">{course.name}</h1>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                {course.enrolled} students
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                {course.duration}
              </div>
              <div className="flex items-center text-yellow-500">
                <Star className="h-5 w-5 mr-2" />
                {course.rating}
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-2">About this course</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id} className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-medium">{chapter.title}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {chapter.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleChapterClick(chapter)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <PlayCircle className="h-5 w-5 text-indigo-600 mr-3" />
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Panel */}
      {showLearningPanel && (
        <LearningPanel
          courseId={id || '1'}
          chapters={course.chapters}
          onClose={() => setShowLearningPanel(false)}
        />
      )}
    </>
  );
}