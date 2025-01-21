import React from 'react';
import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">College Predictor</h1>
        </div>
        <p className="mt-1 text-gray-600">Find the best college matches based on your CET score</p>
      </div>
    </header>
  );
}