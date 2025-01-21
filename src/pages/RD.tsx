import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, MessageSquare, Download } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface Submission {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision';
  feedback?: string;
  submittedAt: string;
  lastUpdated: string;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: 'AI Research Project',
    description: 'Implementation of neural networks for image recognition',
    fileName: 'ai-research-paper.pdf',
    fileSize: '2.4 MB',
    status: 'pending',
    submittedAt: '2024-03-10T10:30:00',
    lastUpdated: '2024-03-10T10:30:00'
  },
  {
    id: '2',
    title: 'Blockchain Technology Research',
    description: 'Analysis of consensus mechanisms in blockchain',
    fileName: 'blockchain-research.pdf',
    fileSize: '3.1 MB',
    status: 'approved',
    feedback: 'Excellent work! The analysis is thorough and well-documented.',
    submittedAt: '2024-03-08T14:20:00',
    lastUpdated: '2024-03-09T09:15:00'
  },
  {
    id: '3',
    title: 'IoT Security Framework',
    description: 'Development of security protocols for IoT devices',
    fileName: 'iot-security.pdf',
    fileSize: '1.8 MB',
    status: 'revision',
    feedback: 'Please include more details about encryption methods.',
    submittedAt: '2024-03-07T16:45:00',
    lastUpdated: '2024-03-08T11:30:00'
  }
];

export function RD() {
  const [activeTab, setActiveTab] = useState<'upload' | 'submissions'>('submissions');
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10485760, // 10MB
    multiple: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // Add new submission
        const newSubmission: Submission = {
          id: Date.now().toString(),
          title,
          description,
          fileName: selectedFile?.name || '',
          fileSize: `${(selectedFile?.size || 0) / (1024 * 1024).toFixed(2)} MB`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        setSubmissions([newSubmission, ...submissions]);
        // Reset form
        setTitle('');
        setDescription('');
        setSelectedFile(null);
        setUploadProgress(0);
        setActiveTab('submissions');
      }
    }, 300);
  };

  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'revision':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  const getStatusIcon = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'revision':
        return <MessageSquare className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Research & Development</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'submissions'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Submissions
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upload Project
            </button>
          </div>
        </div>

        {activeTab === 'upload' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                placeholder="Describe your research project"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-500'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : 'Drag & drop your file here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>
              </div>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                disabled={!selectedFile || !title || !description}
              >
                Submit Project
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {submission.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {getStatusIcon(submission.status)}
                        <span className="ml-1 capitalize">{submission.status}</span>
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{submission.description}</p>
                    
                    {submission.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Feedback:</span> {submission.feedback}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {submission.fileName}
                      </div>
                      <div>{submission.fileSize}</div>
                      <div>
                        Submitted:{' '}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}