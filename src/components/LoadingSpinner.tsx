
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-college-primary animate-spin"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-college-secondary animate-ping opacity-20"></div>
      </div>
      <p className="ml-4 text-lg font-medium text-college-primary">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
