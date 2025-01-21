export interface ScheduleEvent {
  id: number;
  title: string;
  type: 'lecture' | 'assignment' | 'exam' | 'meeting' | 'holiday' | 'leave';
  course: string;
  date: string;
  time: string;
  location?: string;
  description?: string;
}

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: 'Operating Systems Lecture',
    type: 'lecture',
    course: 'Operating Systems',
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Room 301',
    description: 'Process Management and Scheduling'
  },
  {
    id: 2,
    title: 'AI Project Submission',
    type: 'assignment',
    course: 'Artificial Intelligence',
    date: '2024-03-18',
    time: '11:59 PM',
    description: 'Final project submission with documentation'
  },
  {
    id: 3,
    title: 'Mid-term Examination',
    type: 'exam',
    course: 'Software Engineering',
    date: '2024-03-20',
    time: '02:00 PM',
    location: 'Examination Hall 1',
    description: 'Covers modules 1-5'
  },
  {
    id: 4,
    title: 'Study Group Meeting',
    type: 'meeting',
    course: 'Data Structures',
    date: '2024-03-22',
    time: '04:00 PM',
    location: 'Library Discussion Room',
    description: 'Group discussion on Advanced Tree Structures'
  },
  {
    id: 5,
    title: 'Programming Lab',
    type: 'lecture',
    course: 'Computer Programming',
    date: '2024-03-25',
    time: '10:00 AM',
    location: 'Lab 102',
    description: 'Practical session on Object-Oriented Programming'
  },
  {
    id: 6,
    title: 'Holi Festival',
    type: 'holiday',
    course: 'All',
    date: '2024-03-25',
    time: 'All Day',
    description: 'College closed for Holi celebration'
  },
  {
    id: 7,
    title: 'Medical Leave',
    type: 'leave',
    course: 'All',
    date: '2024-03-28',
    time: 'All Day',
    description: 'Student medical leave'
  },
  {
    id: 8,
    title: 'Database Quiz',
    type: 'exam',
    course: 'Database Management',
    date: '2024-03-16',
    time: '11:00 AM',
    location: 'Room 205',
    description: 'Quiz on SQL and Normalization'
  },
  {
    id: 9,
    title: 'Project Presentation',
    type: 'assignment',
    course: 'Software Engineering',
    date: '2024-03-19',
    time: '03:00 PM',
    location: 'Conference Room',
    description: 'Final project presentation to the panel'
  },
  {
    id: 10,
    title: 'Faculty Meeting',
    type: 'meeting',
    course: 'All',
    date: '2024-03-21',
    time: '02:30 PM',
    location: 'Meeting Room 1',
    description: 'Discussion about curriculum updates'
  }
];