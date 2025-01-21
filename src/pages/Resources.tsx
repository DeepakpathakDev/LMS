import React from 'react';
import { FileText, Download, ExternalLink, Search } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Introduction to Programming Study Guide',
    type: 'PDF',
    size: '2.4 MB',
    category: 'Study Materials',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Data Structures Practice Problems',
    type: 'PDF',
    size: '1.8 MB',
    category: 'Practice Sets',
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Digital Electronics Lab Manual',
    type: 'PDF',
    size: '3.2 MB',
    category: 'Lab Materials',
    downloadUrl: '#',
  },
];

const categories = [
  'All Resources',
  'Study Materials',
  'Practice Sets',
  'Lab Materials',
  'Previous Papers',
];

export function Resources() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Learning Resources</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="divide-y divide-gray-200">
              {resources.map((resource) => (
                <div key={resource.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{resource.type}</span>
                          <span>{resource.size}</span>
                          <span>{resource.category}</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-700">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}