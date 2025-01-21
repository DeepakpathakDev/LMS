export interface Message {
  id: number;
  sender: {
    name: string;
    avatar: string;
    online: boolean;
  };
  content: string;
  timestamp: string;
  unread: boolean;
}

export const messages: Message[] = [
  {
    id: 1,
    sender: {
      name: 'Mark Lee',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: true
    },
    content: 'Hey, do you have the notes from today\'s Operating Systems lecture?',
    timestamp: '2 mins ago',
    unread: true
  },
  {
    id: 2,
    sender: {
      name: 'Jung Jaehyun',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: true
    },
    content: 'The AI project meeting is scheduled for tomorrow at 3 PM',
    timestamp: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    sender: {
      name: 'Kim Taeyeong',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: false
    },
    content: 'Please submit your Software Engineering assignment by Friday',
    timestamp: '3 hours ago',
    unread: true
  }
];