import React from 'react';

interface PointsDisplayProps {
  points: number;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
  return (
    <div className="bg-dark-surface px-3 py-1.5 rounded-full border border-primary-dark text-sm">
      <span>{points}</span>
      <span className="text-primary-light font-medium ml-1">Puan</span>
    </div>
  );
};

export default PointsDisplay;
