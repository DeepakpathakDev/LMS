import React, { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Chat } from '../components/Chat';
import { messages } from '../data/messages';

export function Messages() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(message =>
    message.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedContact(message.sender.name)}
              className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedContact === message.sender.name ? 'bg-purple-50 dark:bg-purple-900/20' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  className="w-12 h-12 rounded-full"
                />
                {message.sender.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {message.sender.name}
                  </h3>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {message.content}
                </p>
                {message.unread && (
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    New
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        {selectedContact ? (
          <Chat contactId={selectedContact} />
        ) : (
          <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No message selected</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}