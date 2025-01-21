import React from 'react';

interface College {
  name: string;
  ranking: number;
  location: string;
  cutoffs: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

interface PredictionResultsProps {
  predictions: College[];
}

export function PredictionResults({ predictions }: PredictionResultsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Predicted Colleges</h2>
      <div className="space-y-4">
        {predictions.map((college, index) => (
          <div
            key={college.name}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{college.name}</h3>
                <p className="text-gray-600">{college.location}</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                Rank: {college.ranking}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}