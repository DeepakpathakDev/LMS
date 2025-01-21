import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, BookOpen, FileText, Bell, Calendar as CalendarCheck } from 'lucide-react';
import { scheduleEvents } from '../data/schedule';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const eventTypeColors = {
  lecture: 'bg-blue-100 text-blue-800 border-blue-200',
  exam: 'bg-red-100 text-red-800 border-red-200',
  assignment: 'bg-purple-100 text-purple-800 border-purple-200',
  meeting: 'bg-green-100 text-green-800 border-green-200',
  holiday: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  leave: 'bg-orange-100 text-orange-800 border-orange-200'
};

export function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return scheduleEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="h-6 w-6 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day Headers */}
          {DAYS.map(day => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {generateCalendarDays().map((date, index) => (
            <div
              key={index}
              className={`bg-white min-h-[120px] p-2 ${
                date ? 'cursor-pointer hover:bg-gray-50' : ''
              }`}
              onClick={() => date && setSelectedDate(date)}
            >
              {date && (
                <>
                  <div className={`flex items-center justify-center h-8 w-8 mb-1 rounded-full ${
                    isToday(date)
                      ? 'bg-purple-600 text-white'
                      : isSelected(date)
                      ? 'bg-purple-100 text-purple-600'
                      : ''
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDate(date).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`px-2 py-1 text-xs rounded-md border ${eventTypeColors[event.type]} truncate`}
                        title={event.title}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {getEventsForDate(selectedDate).map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200"
              >
                <div className={`p-2 rounded-lg ${eventTypeColors[event.type]}`}>
                  {event.type === 'lecture' && <BookOpen className="h-5 w-5" />}
                  {event.type === 'exam' && <FileText className="h-5 w-5" />}
                  {event.type === 'assignment' && <CalendarCheck className="h-5 w-5" />}
                  {event.type === 'meeting' && <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                    {event.location && (
                      <span className="ml-3">at {event.location}</span>
                    )}
                  </div>
                  {event.description && (
                    <p className="mt-2 text-sm text-gray-600">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}