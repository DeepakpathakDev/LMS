export interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  course: string;
  mutualFriends: number;
}

export const friends: Friend[] = [
  {
    id: 1,
    name: 'Maren Maureen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64',
    status: 'online',
    course: 'Computer Science',
    mutualFriends: 15
  },
  {
    id: 2,
    name: 'Jennifer Jane',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=64',
    status: 'online',
    course: 'Data Science',
    mutualFriends: 8
  },
  {
    id: 3,
    name: 'Ryan Herwinds',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=64',
    status: 'busy',
    course: 'Artificial Intelligence',
    mutualFriends: 12
  },
  {
    id: 4,
    name: 'Kierra Culhane',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=64',
    status: 'offline',
    course: 'Software Engineering',
    mutualFriends: 5
  },
  {
    id: 5,
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=64',
    status: 'online',
    course: 'Computer Science',
    mutualFriends: 20
  }
];