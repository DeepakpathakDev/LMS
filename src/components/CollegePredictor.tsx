import React, { useState } from 'react';
import { School, Users, BookOpen } from 'lucide-react';
import { PredictionResults } from './PredictionResults';
import { branches, categories, collegeData } from '../data/collegeData';

export function CollegePredictor() {
  const [formData, setFormData] = useState({
    cetScore: '',
    category: '',
    branch: '',
  });
  const [predictions, setPredictions] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.cetScore || !formData.category || !formData.branch) {
      setError('Please fill in all fields');
      return;
    }

    const score = Number(formData.cetScore);
    if (score < 1 || score > 100) {
      setError('CET Score must be between 1 and 100');
      return;
    }

    // Simulate college predictions based on the input
    const predictedColleges = collegeData
      .filter((college) => {
        const cutoff = college.cutoffs[formData.category][formData.branch];
        return score >= cutoff;
      })
      .sort((a, b) => b.ranking - a.ranking)
      .slice(0, 5);

    setPredictions(predictedColleges);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <School className="h-4 w-4" />
                  <span>CET Score</span>
                </div>
              </label>
              <input
                type="number"
                value={formData.cetScore}
                onChange={(e) => setFormData({ ...formData, cetScore: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your CET score"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Category</span>
                </div>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Branch</span>
                </div>
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Predict Colleges
            </button>
          </div>
        </form>
      </div>

      {predictions.length > 0 && <PredictionResults predictions={predictions} />}
    </div>
  );
}