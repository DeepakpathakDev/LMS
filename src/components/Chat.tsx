import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, Smile } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isOwn?: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

interface ChatProps {
  contactId: string;
  onMessageSent?: (message: Message) => void;
}

export function Chat({ contactId, onMessageSent }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate loading chat history when contact changes
  useEffect(() => {
    const loadChatHistory = async () => {
      // Simulate API call
      const mockHistory: Message[] = [
        {
          id: '1',
          sender: {
            id: '2',
            name: 'Dr. Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          content: 'Hello! How can I help you with the course material?',
          timestamp: '10:30 AM'
        },
        {
          id: '2',
          sender: {
            id: '1',
            name: 'You',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          content: 'I had a question about the latest assignment on data structures.',
          timestamp: '10:31 AM',
          isOwn: true
        }
      ];
      setMessages(mockHistory);
    };

    loadChatHistory();
  }, [contactId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: '1',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    onMessageSent?.(message);

    // Simulate response
    setIsTyping(true);
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: {
          id: '2',
          name: 'Dr. Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        content: 'I will help you with that. Which part of the assignment are you struggling with?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate file upload
    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: '1',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      attachments: [{
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        name: file.name
      }]
    };

    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Chat header */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Dr. Sarah Johnson"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Dr. Sarah Johnson</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTyping ? 'Typing...' : 'Course Instructor'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${message.isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full"
              />
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.content && <p>{message.content}</p>}
                {message.attachments?.map((attachment, index) => (
                  <div key={index} className="mt-2">
                    {attachment.type === 'image' ? (
                      <img
                        src={attachment.url}
                        alt={attachment.name}
                        className="max-w-xs rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-sm">
                        <Paperclip className="w-4 h-4" />
                        <span>{attachment.name}</span>
                      </div>
                    )}
                  </div>
                ))}
                <span className="text-xs mt-1 opacity-75">{message.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Image className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="p-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}