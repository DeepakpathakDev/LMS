import React, { useState } from 'react';
import { Play, Pause, BookOpen, MessageSquare, CheckCircle, ChevronLeft, ChevronRight, FileText, Menu } from 'lucide-react';
import { Chat } from './Chat';
import { Link, useLocation } from 'react-router-dom';

interface Chapter {
  id: number;
  title: string;
  videoUrl: string;
  pdfUrl: string;
  completed: boolean;
}

interface LearningPanelProps {
  courseId: string;
  chapters: Chapter[];
  onClose: () => void;
}

export function LearningPanel({ courseId, chapters, onClose }: LearningPanelProps) {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  const handleChapterComplete = () => {
    setActiveChapter({ ...activeChapter, completed: true });
  };

  const handleNextChapter = () => {
    const currentIndex = chapters.findIndex(chapter => chapter.id === activeChapter.id);
    if (currentIndex < chapters.length - 1) {
      setActiveChapter(chapters[currentIndex + 1]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handlePreviousChapter = () => {
    const currentIndex = chapters.findIndex(chapter => chapter.id === activeChapter.id);
    if (currentIndex > 0) {
      setActiveChapter(chapters[currentIndex - 1]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-[60]">
      <div className="flex h-full">
        {/* Chapters Sidebar */}
        <div className={`bg-gray-800 w-72 flex-shrink-0 transition-all duration-300 transform ${
          showChapters ? 'translate-x-0' : '-translate-x-72'
        }`}>
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Chapters</h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapter(chapter);
                  setShowChapters(false);
                }}
                className={`w-full text-left p-4 hover:bg-gray-700 transition-colors ${
                  activeChapter.id === chapter.id ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex items-center text-white">
                  {chapter.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-500 rounded-full mr-2" />
                  )}
                  <span>{chapter.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChapters(!showChapters)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <h2 className="text-white font-semibold">{activeChapter.title}</h2>
            </div>
            <button
              onClick={() => setShowChat(!showChat)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative flex-1 bg-black">
            <video
              className="w-full h-full"
              src={activeChapter.videoUrl}
              onTimeUpdate={(e) => setProgress((e.target as HTMLVideoElement).currentTime)}
              onEnded={() => {
                setIsPlaying(false);
                setProgress(0);
              }}
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8" />
                  )}
                </button>
                
                {/* Progress Bar */}
                <div className="flex-1 h-1 bg-gray-600 rounded-full">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(progress / 100) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <button
              onClick={handlePreviousChapter}
              disabled={chapters.indexOf(activeChapter) === 0}
              className="px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 rounded-lg transition-colors"
            >
              Previous Chapter
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open(activeChapter.pdfUrl, '_blank')}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>View PDF</span>
              </button>
              
              <button
                onClick={handleChapterComplete}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeChapter.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span>{activeChapter.completed ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            <button
              onClick={handleNextChapter}
              disabled={chapters.indexOf(activeChapter) === chapters.length - 1}
              className="px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 rounded-lg transition-colors"
            >
              Next Chapter
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        <div className={`bg-white w-80 flex-shrink-0 transition-all duration-300 transform ${
          showChat ? 'translate-x-0' : 'translate-x-80'
        }`}>
          <Chat contactId={courseId} />
        </div>
      </div>
    </div>
  );
}